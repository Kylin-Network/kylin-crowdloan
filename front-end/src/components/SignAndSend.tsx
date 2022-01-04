import React, { useCallback, useEffect, useState } from "react"
import { CompletedHandler } from "./ProgressBar"
import { Flex, Box, Center, Alert, useToast, AlertIcon, Heading, Spinner, Text } from "@chakra-ui/react"
import { Button } from '../components/Button'
import { useWallet } from "../hooks"
import { EventRecord, ExtrinsicStatus } from '@polkadot/types/interfaces'

interface ProgressProps {
  value: number;
  text?: string;
}
export const Progress: React.FC<ProgressProps> = ({ value, text }) => {
  return (
    <>
      <Box mt='2rem' mb='2rem' height='1rem' overflow='hidden' borderRadius='.5rem' w='100%' border='1px solid var(--primary-color)' bg='black'>
        <Box w={`${value}%`} height='1rem' bg='linear-gradient(90deg, black, var(--primary-color))'></Box>
      </Box>
      <Center mb='20rem'>
        {text}
      </Center>
    </>
  )
}

export const SignAndSend: React.FC<CompletedHandler> = ({ setCompleted }) => {
  const toast = useToast()
  const { api, initApi, isReady, isApiConnected, apiError, signature, current } = useWallet()
  const [loading, setLoading] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const [progressText, setProgressText] = useState('Being interacting')

  useEffect(() => {

    initApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {

    let unsub: any
    if (loading && isApiConnected && isReady && api) {
      console.log(signature);
      const asyncFn = async () => {

        try {

          // setProgressValue(20)
          // setProgressText('Interacting')
          // let res = await api.query.system.account(current.address) as any;
          // let {free} = res.data
          // console.log(free);

          setProgressValue(30)
          setProgressText('Validation token acquired. Signing extrinsic... ')

          unsub = await api.tx.system.remark(signature).signAndSend(current.address,
            ({ events = [], status }: { events?: EventRecord[]; status: ExtrinsicStatus }) => {
              if (status.isInBlock || status.isFinalized) {
                events.forEach(({ event }) => {

                  if (event.method === 'ExtrinsicSuccess') {
                    setProgressValue(100)
                    setProgressText('Successful')
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
                    setProgressText('Failed')
                    setProgressValue(100)
                  }
                })
                // toast.close(loadingMsg.current as ToastId)

                setCompleted(5)
                setLoading(false)
              }
            }
          )
        } catch (err: any) {
          toast({
            description: err.message,
            status: 'error',
            duration: 3000
          })
          setLoading(false)
        }
      }

      asyncFn()

    }

    return () => {
      unsub && unsub()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, current.address, isApiConnected, isReady, loading, setCompleted, signature])

  const handleSign = useCallback(async () => {
    setLoading(true)
  }, [])

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
      <Heading color='white' size='md'>Step 5</Heading>
      {
        loading ? <Loading /> : (
          <>
            <Flex alignItems='start' mt='3rem' mb='8'>
              <Box textAlign={'left'} p='1rem' display='inline-block' w={['100%', '33%']}>
                <Heading mb='.5rem' size={'md'} color={'pink.200'}>Update Metadata </Heading>
                <Text color='white' fontSize='1rem'>
                  {`We highly recommend updating the Polkadot{.js} extension with the latest network metadata, so the transaction can be properly shown and inspected by you. This can be done by going to the `}
                  <a href="https://polkadot.js.org/apps/?rpc=wss://rpc.polkadot.io#/settings/metadata" style={{ textDecoration: 'underline' }} target='_blank' rel='noopener noreferrer'>{`settings in Polkadot{.js} app`}</a>
                  {`, selecting the "Metadata" tab, and clicking "Update metadata" in the extensions section (this option will only appear if an update is needed)`}
                </Text>
              </Box>
              <Box textAlign={'left'} p='1rem' display='inline-block' w={['100%', '33%']}>
                <Heading mb='.5rem' size={'md'} color={'pink.200'}>About this Signing Transaction </Heading>
                <Text color='white' fontSize='1rem'>
                  By clicking "Sign and send" below, your agreement to the Kylin Crowdloan Terms and Conditions wi ll be stored on-chain, to your DOT account. This will be i n the form of a remark extrinstic signed by your account.
                </Text>
              </Box>
              <Box textAlign={'left'} p='1rem' display='inline-block' w={['100%', '33%']}>
                <Heading mb='.5rem' size={'md'} color={'pink.200'}>Fees</Heading>
                <Text color='white' fontSize='1rem'>
                  Please note that this signing transaction wi ll be subject to transaction fees on the Polkadot network (around 0.0411 DOT), and Polka dot has a minimum balance of 1 DOT.
                </Text>
              </Box>
            </Flex>
            {
              apiError && (
                <Alert status="error">
                  <AlertIcon />
                  {apiError || `There was an error while connect to the Endpoint.`}
                </Alert>)
            }

            {
              process.env.NODE_ENV === 'development' &&
              <Button borderRadius='20' onClick={() => setCompleted(5)}>next</Button>
            }
            <Button disabled={!isReady} mr='4' borderRadius='20' onClick={handleSign}>
              {!isReady ? (
                <>
                  <Spinner size={'sm'} color="white" />
                </>
              ) : 'Sign and send'}
            </Button>
            <Button mb='6rem' type='white' borderRadius='20' onClick={() => setCompleted(3)}>Go back</Button>
          </>
        )
      }
    </div>
  )
}