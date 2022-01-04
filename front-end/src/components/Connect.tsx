import React from 'react'
import { useWallet } from '../hooks'
import { StepCompletedProps } from '../interface'
import { Box, Heading, Text } from '@chakra-ui/react'
import { Button } from '../components/Button'
import { Row, Col } from '../components/Grids'

export const Connect: React.FC<StepCompletedProps> = ({ onCompleted, stepText }) => {
  const { initWeb3Enable } = useWallet()
  const handleConnect = async () => {
    await initWeb3Enable()
    onCompleted && onCompleted()
  }

  return (
    <div className='align-center'>
      <Heading color='white' size='md'>{stepText}</Heading>
      <Heading m='3rem' color={'pink.200'}>{`Allow Connection to Polkadot{.js}`}</Heading>
      {/* <Box pl='10rem' pr='10rem'>
        <Box textAlign={'left'} display='inline-block' width={['100%', '50%']} p='4rem'>
          <Heading mb='.5rem' size={'md'} color={'pink.200'}>{`Access to Polkadot{.js}`}</Heading>
          <Text color='white' fontSize='1rem'>
            In order to sign the terms and conditions, this application needs access to the Polkadot is extension in your browser.
          </Text>
        </Box>
        <Box textAlign={'left'} display='inline-block' width={['100%', '50%']} p='4rem'>
          <Heading mb='.5rem' size={'md'} color={'pink.200'}>You're safe </Heading>
          <Text color='white' fontSize='1rem'>
            This step simply allows the application to connect. You will still have the ability to sign or cancel any transactions.
          </Text>
        </Box>
      </Box> */}

      <Row>
        <Col>
          <Box textAlign={'left'} display='inline-block' width={['100%']} p='4rem'>
            <Heading mb='.5rem' size={'md'} color={'pink.200'}>{`Access to Polkadot{.js}`}</Heading>
            <Text color='white' fontSize='1rem'>
              In order to sign the terms and conditions, this application needs access to the Polkadot is extension in your browser.
            </Text>
          </Box>
        </Col>
        <Col>
          <Box textAlign={'left'} display='inline-block' width={['100%']} p='4rem'>
            <Heading mb='.5rem' size={'md'} color={'pink.200'}>You're safe </Heading>
            <Text color='white' fontSize='1rem'>
              This step simply allows the application to connect. You will still have the ability to sign or cancel any transactions.
            </Text>
          </Box>
        </Col>
      </Row>
      <Button mb='5rem' onClick={handleConnect}>{`Connect to Polkadot{.js}`}</Button>
    </div>
  )
}
