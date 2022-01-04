import React, { useState } from 'react'
import styled from 'styled-components'
import { Connect } from '../components/Connect'
import { Contribution } from '../components/Contribution'
import { ProgressBar } from '../components/ProgressBar'
import { SelectAccount } from '../components/SelectAccount'
import { Box, Heading, Text } from '@chakra-ui/react'

const ReviewWrap = styled.div`
position:relative;
min-height:90vh;
width: 100%;
.container{
  padding: 5rem 0;
}

&:before{
  position:absolute;
  z-index:0;
  top:0;
  left:0;
  content: '';
  display: block;
  width:100%;
  height: 20rem;
  background: linear-gradient(180deg, #3F1123,#000);
}

&:after{
  position:absolute;
  z-index:0;
  bottom:0;
  left:0;
  content: '';
  display: block;
  width:100%;
  height: 10rem;
  background: linear-gradient(180deg, #000,#3F1123);
}
`
export const Review = () => {
  const [completed, setCompleted] = useState(0)
  return (
    <ReviewWrap>
      <div className="container">
        <Box pl='10rem' pr='10rem'>
          <ProgressBar completed={completed} steps={2} />
        </Box>
        {completed === 0 && <Connect stepText='Step 1' onCompleted={() => setCompleted(1)} />}
        {completed === 1 && <SelectAccount stepText='Step 2' onCompleted={() => setCompleted(2)} >
          <Box display='inline-block' textAlign={'center'} mt='3rem' mr='20rem' ml='20rem' pl='3rem' pr='3rem' mb='3rem'>
            <Heading mb='.5rem' size={'md'} color={'pink.200'}>Select an account </Heading>
            <Text color='white' fontSize='1rem'>
              Select the Polkadot address you will use to fund your crowdloan contribution. The DOT you plan to use must be unlocked and transferable.
            </Text>

          </Box>
        </SelectAccount>}
        {completed === 2 && <Contribution  setCompleted={setCompleted}/>}
      </div>
    </ReviewWrap>
  )
}
