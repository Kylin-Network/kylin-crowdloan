import { useCallback, useEffect, useReducer, useState } from 'react'
import { useWallet } from '../hooks'
import { blake2AsHex } from '@polkadot/util-crypto'
import { u8aToHex } from '@polkadot/util'
import { decodeAddress, encodeAddress } from '@polkadot/util-crypto'
import { Box, Flex, Heading, Text, Center } from '@chakra-ui/react'
import { Button } from './Button'
import { CompletedHandler } from './ProgressBar'
import Identicon from '@polkadot/react-identicon'
import { Keyring } from '@polkadot/api'
import { EventRecord, ExtrinsicStatus } from '@polkadot/types/interfaces'
import {
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { isValidAddressPolkadotAddress } from '../utils'

const totalReward = Number(process.env.REACT_APP_TOTAL_REWARD ?? 0)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const earlybirdReward = Number(process.env.REACT_APP_EARLYBIRD_REWARD ?? 0)

export const Contribution: React.FC<CompletedHandler> = ({ setCompleted }) => {
  const toast = useToast()
  const keyring = new Keyring()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { initApi, api, isReady, current, parachainId, Decimals } = useWallet()
  const [loading, setLoading] = useState(true)
  const [changeLoading, setChangeLoading] = useState(false)
  const [addressErr, setAddressErr] = useState('')
  const [newMemo, setNewMemo] = useState('')
  const [reload, dispatchReload] = useReducer(c => c + 1, 0)
  const [contribution, setContribution] = useState({
    address: '',
    contribute: 0,
    memo: '',
    reward: 0
  })


  useEffect(() => {
    initApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!newMemo) {
      return
    }
    if (!isValidAddressPolkadotAddress(newMemo)) {
      setAddressErr('Please enter valid address')
      toast({
        status: 'error',
        position: 'top',
        description: 'Please enter valid address'
      })
    } else {
      setAddressErr('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMemo])
  useEffect(() => {
    if (!(isReady && api)) {
      return
    }
    const asyncFn = async () => {
      try {

        const { parentHash } = (await api.rpc.chain.getHeader() as any)

        // First we retrieve the trie index of the parachain-id fund info
        const funds: any = (await (await api.at(parentHash)).query.crowdloan.funds(parachainId)).toJSON()
        console.log(funds)
        if (!funds) {
          setLoading(false)
          return
        }

        const address = current.address
        const raised = funds['raised'] / 10 ** Decimals
        // console.log(u8aToHex(parentHash))


        // Second we calculate the crowdloan key. This is composed of
        // b':child_storage:default:' + blake2_256(b'crowdloan' + trie_index as u32)
        let bytes = new TextEncoder().encode('crowdloan')
        // We allocate 4 bytes for the trie index
        let buf = Buffer.allocUnsafe(4)
        buf.writeUInt32LE(funds['trieIndex'], 0)
        const array = Uint8Array.from(buf)
        const concatArray = new Uint8Array([...bytes as any, ...array as any])
        let child_encoded_bytes = u8aToHex(new TextEncoder().encode(':child_storage:default:'))
        let crowdloan_key = child_encoded_bytes + blake2AsHex(concatArray, 256).substring(2)

        const keys = await api.rpc.childstate.getKeys(crowdloan_key, u8aToHex(decodeAddress(address)), parentHash) as any

        const storage = await api.rpc.childstate.getStorage(crowdloan_key, keys[0]) as any

        if (storage.isSome) {
          let storage_item = storage.unwrap()
          let balance = u8aToHex(storage_item.slice(0, 16).reverse())

          const contribute = parseInt(balance, 16) / (10 ** Decimals)
          const reward = (totalReward) / raised * contribute

          const retrievedAddress = encodeAddress(keys[0].toHex(), 0)
          const memo = encodeAddress(retrievedAddress, 42)

          // console.log(encodeAddress(storage_item.slice(17, storage_item.length), 42))
          setContribution({
            address: retrievedAddress,
            contribute,
            memo,
            reward
          })
        }

        setLoading(false)
      } catch (error: any) {
        toast({
          position: 'top',
          description: error.message,
          status: 'error'
        })
        setLoading(false)
      }



    }
    asyncFn()
  }, [Decimals, api, current, isReady, parachainId, reload])

  const handleChangeMemo = useCallback(() => {
    if (!api) {
      toast({
        status: 'error',
        description: 'Error occured while connect to Endpoint.'
      })
      return
    }
    if (!newMemo) {
      toast({
        status: 'error',
        description: 'Please enter a valid address.'
      })
      return
    }
    let unsub: any = null
    const asyncFn = async () => {
      try {
        setChangeLoading(true)

        const m = keyring.decodeAddress(newMemo)

        const memo = u8aToHex(m)

        unsub = await api.tx.crowdloan.addMemo(parachainId, memo).signAndSend(current.address, ({ events = [], status }: { events?: EventRecord[], status: ExtrinsicStatus }) => {
          if (status.isReady) {
            toast({
              description: 'Waiting...',
              status: 'info',
              duration: null,
              id: 'ready',
              position: 'top'
            })
          } else if (status.isInBlock || status.isFinalized) {

            events.forEach(({ event }) => {
              if (event.method === 'ExtrinsicSuccess') {
                dispatchReload()
                onClose()
                setNewMemo('')
                toast({
                  description: 'Extrinsic successful',
                  status: 'success',
                  position: 'top'
                })
              } else if (event.method === 'ExtrinsicFailed') {
                const { data: [error] } = event

                if ((error as any).isModule) {
                  // for module errors, we have the section indexed, lookup
                  const decoded = api.registry.findMetaError((error as any).asModule);
                  const { docs } = decoded;

                  toast({
                    description: `${docs.join(' ')}`,
                    status: 'error',
                    position: 'top'
                  })
                } else {
                  // Other, CannotLookup, BadOrigin, no extra info
                  console.log(error.toString());
                  toast({
                    description: error.toString(),
                    status: 'error',
                    position: 'top'
                  })
                }
              }
            })
            toast.close('ready')
            setChangeLoading(false)
            unsub()
          }
        })
      } catch (error: any) {
        toast({
          status: 'error',
          description: error.message
        })
        setChangeLoading(false)
      }
    }
    asyncFn()

    return () => {
      unsub && unsub()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Decimals, api, current.address, parachainId])

  return (
    <div className='align-center'>
      {loading ? (
        <Heading mt='4rem' mb='10rem' color='pink.200'>Loading account</Heading>
      ) : !contribution.contribute ? (
        <>
          <Heading mb='2rem'>This account didn't participate in the crowdloan</Heading>
          <Button mb='10rem' type='white' onClick={() => setCompleted(1)}>Choose diffrent Account</Button>
        </>
      ) : (
        <>
          <Heading mt='4rem' color='pink.200'>Contribution details</Heading>
          <Text mt='1rem' mb='3rem' textAlign='center' pl='15rem' pr='15rem'>You have successfully contributed 5 DOT to the Kylin crowdloan. These funds are now locked for the duration of the crowd loan, plus the duration of the parachain slot (96 weeks) if an auction is won.</Text>
          <Center>
            <Box w='40rem' bg='#181818' p='3rem' borderRadius='2rem'>
              <Heading color='pink.200' size='md'>DOT address</Heading>

              <Flex mt='4' mb='4' alignItems='center' justify='center'>
                <Identicon
                  value={contribution.address}
                  size={32}
                  theme={'polkadot'}
                />
                <Text ml='1rem'>{contribution.address}</Text>
              </Flex>
              <Heading mt='2rem' color='pink.200' size='md'>Memo</Heading>

              <Flex mt='4' mb='4' alignItems='center' justify='center'>
                <Text ml='1rem'>{contribution.memo}</Text>
              </Flex>
              <Heading mt='2rem' color='pink.200' size='md'>Contributed</Heading>
              <p>{contribution.contribute} DOT</p>
              <Heading mt='2rem' color='pink.200' size='md'>Rewards if the crowd loan theoretically closed right now</Heading>
              <p>{Math.floor((contribution.reward) * 10000) / 10000} KYL</p>
            </Box>
          </Center>
          <Button mt='2rem' mr='2rem' mb='4rem' type='white' onClick={() => setCompleted(1)}>Check Another DOT Address</Button>
          <Button mt='2rem' mb='4rem' type='white' onClick={onOpen}>Change Another Memo</Button>
          <Modal
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Change Memo</ModalHeader>
              <ModalBody>
                <Input
                  isInvalid={!!addressErr} value={newMemo} onChange={(e) => setNewMemo(e.target.value)} placeholder='Please enter your polkadot address'></Input>
              </ModalBody>

              <ModalFooter>
                <Button type='white' mr='1rem' onClick={onClose}>
                  Close
                </Button>
                <Button
                  disabled={changeLoading || !newMemo || !!addressErr}
                  onClick={handleChangeMemo}>
                  {
                    changeLoading ? 'loading' :
                      'Confirm'
                  }
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  )
}