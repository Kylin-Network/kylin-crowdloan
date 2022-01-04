import { useToast, Box, Heading, Flex, Input, InputGroup, InputRightAddon, Center, Text } from "@chakra-ui/react"
import { Button } from '../components/Button'
import { useCallback, useRef, useState } from "react"
import { validNumber } from "../utils"
import { CompletedHandler } from "./ProgressBar"
import Identicon from '@polkadot/react-identicon'
import { useWallet } from "../hooks"
import { BigNumber } from "bignumber.js"
import { Progress } from './SignAndSend'

export const ConfirmContribute: React.FC<CompletedHandler> = ({ setCompleted }) => {

  const minAmount = 5
  const [amount, setAmount] = useState(minAmount)
  const [tipsColor, setTipsColor] = useState('#999')
  const [tips, setTips] = useState('The minimum contribution is 5 DOT')
  const { current, api, Decimals, parachainId, setContributed } = useWallet()
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const [progressValue, setProgressValue] = useState(0)
  const [progressText, setProgressText] = useState('Being interacting')
  const amountInput = useRef<HTMLInputElement>(null)

  const handleContribute = useCallback(() => {
    if (!api) {
      toast({
        status: 'error',
        description: 'Error occured while connect to Endpoint.'
      })
      return
    }
    if (amount < 5) {
      toast({
        status: 'error',
        description: 'The contribution amount needs to bigger than 5.',
        position: 'top'
      })
      amountInput.current?.focus()
      return
    }
    let unsub: any = null
    const asyncFn = async () => {
      try {
        setLoading(true)
        setProgressValue(30)
        setProgressText('Signature acquired. Signing extrinsic... ')
        const Amount = new BigNumber(amount).times(10 ** Decimals).toNumber()
        
        // const m = keyring.decodeAddress(current.address)
        // const memo = u8aToHex(m)

        // const txs = api.tx.utility.batchAll([
        //   api.tx.crowdloan.contribute(parachainId, Amount, null),
        //   api.tx.crowdloan.addMemo(parachainId, memo)
        // ])
        const tx = api.tx.crowdloan.contribute(parachainId, Amount, null)
        unsub = await tx.signAndSend(current.address, (result) => {

          const { events = [], status } = result
          
          if (status.isReady) {
            toast({
              description: 'Waiting...',
              status: 'info',
              duration: null,
              id: 'ready',
              position: 'top'
            })
            setProgressValue(50)
            setProgressText('Ready')
          } else if (status.isInBlock || status.isFinalized) {
            events.forEach(({ event }) => {

              if (event.method === 'ExtrinsicSuccess') {
          
                setContributed({
                  address: current.address,
                  amount,
                  hash: tx.hash.toHex()
                })
                setCompleted(6)
              } else if (event.method === 'ExtrinsicFailed') {
                const { data: [error] } = event

                if ((error as any).isModule) {
                  // for module errors, we have the section indexed, lookup
                  const decoded = api.registry.findMetaError((error as any).asModule);
                  const { docs } = decoded;

                  toast({
                    description:`${docs.join(' ')}`,
                    status:'error',
                    position:'top'
                  })
                } else {
                  // Other, CannotLookup, BadOrigin, no extra info
                  console.log(error.toString());
                  toast({
                    description:error.toString(),
                    status:'error',
                    position:'top'
                  })
                }
              }
            })
            toast.close('ready')
            setLoading(false)
            unsub()
          }
        })
      } catch (error: any) {
        toast({
          status: 'error',
          description: error.message
        })
        setLoading(false)
      }
    }
    asyncFn()

    return () => {
      unsub && unsub()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Decimals, amount, api, current.address, parachainId])

  const handleAmountChange = (e: any) => {
    const val = e.target.value
    if (!validNumber(String(val))) {
      return
    }
    setAmount(e.target.value)
  }

  const handleOnBlur = (e: any) => {
    const val = e.target.value
    if (val < 5) {
      setTipsColor('orangered')
      setTips('The contribution amount needs to bigger than 5')
      amountInput.current?.focus()
    }else{
      setTips('The minimum contribution is 5 DOT')
      setTipsColor('#999')
    }
  }
  // useEffect(() => {
  //   if (!amount) {
  //     return
  //   }
  //   if (amount < 5) {
  //     toast({
  //       status: 'error',
  //       description: 'The minimum contribution is 5 DOT',
  //       position: 'top'
  //     })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [amount])

  const Loading = () => {
    return (
      <>
        <Heading color={'pink.200'} m='3rem'>Transaction in Process</Heading>
        <Progress text={progressText} value={progressValue} />
      </>
      // <Progress borderRadius='.5rem' bg='black' size='md' variant='outline' colorScheme='pink.200' isIndeterminate />
    )
  }
  return (
    <div className='align-center'>
      {
        loading ? <Loading /> : (
          <>
            <Heading color='white' size='md'>Step 6</Heading>
            <Heading m='3rem' color='pink.200'>Confirm a Contribution Amount and Rewards Address </Heading>
            <Flex mb='2rem' direction='column' alignItems='center'>
              <Box background='#181818' w='40rem' borderRadius='12' p='2rem' m='4' mb='8'>
                <Heading color='pink.200' size='lg' mb='3rem'>Contribute</Heading>
                <Box textAlign='center'>
                  <Heading size='sm' color='pink.200'>DOT Address</Heading>
                  <Flex mt='4' mb='4' alignItems='center' justify='center'>
                    <Identicon
                      value={current.address}
                      size={32}
                      theme={'polkadot'}
                    />
                    <Text ml='1rem'>{current.address}</Text>
                  </Flex>
                </Box>
                <Heading size='sm' color='pink.200' mt='3rem'>Amount to contribute</Heading>

                <InputGroup mt='4' colorScheme='pink' >
                  <Input textAlign='center' ref={amountInput} borderColor='pink.200' borderRadius='1.5rem' value={amount} onBlur={handleOnBlur} onChange={handleAmountChange} minW='80' type='number' variant='outline' background='black' />
                  <InputRightAddon borderRadius='1.5rem' bg='pink.200' children='DOT' />
                </InputGroup>
                <Center color={tipsColor} mt='1rem' mb='2rem'>{tips}</Center>
                <Box textAlign='left'>If Kylin wins a Polka dot slot, your contribution will be locked until~October 20, 2023, when the slot lease ends. If Kylin does not get a slot, your contribution will be locked until December 16, 2021 </Box>
              </Box>
            </Flex>
            <Button mr='4' onClick={handleContribute}>Sign and send</Button>
            {/* {process.env.NODE_ENV === 'development' &&
              <Button mr='4' onClick={() => setCompleted(6)}>next</Button>} */}
            {/* https://polkadot.js.org/docs/extension/cookbook/ */}
            <Button type='white' onClick={() => setCompleted(2)}>Choose diffrent account</Button>

          </>
        )
      }</div>
  )
}