import React, { useState } from 'react'
import styled from 'styled-components'
// import { Claims } from '../pages/Claims'
import { Contribute } from '../pages/Contribute'
import { Review } from '../pages/Review'
import { Stack, Center, Box, Flex, Image, Heading, Text, SimpleGrid } from "@chakra-ui/react"
import { Button } from '../components/Button'
import { ReactComponent as Logo } from '../assets/logo.svg'
import OtherWays from '../assets/p4-logo.png'

import dots from '../assets/dots.png'
import p2Icon1 from '../assets/p2-icon1.png'
import p2Icon2 from '../assets/p2-icon2.png'
import p2Icon3 from '../assets/p2-icon3.png'
import p2Bg from '../assets/p2-bg.png'
import p3Icon1 from '../assets/p3-icon1.svg'
import p3Icon2 from '../assets/p3-icon2.svg'
import p3Icon3 from '../assets/p3-icon3.svg'
import p3Icon4 from '../assets/p3-icon4.svg'
import Telegram from '../assets/footer-icons/telegram.png'
import Twitter from '../assets/footer-icons/twitter.png'
import Medium from '../assets/footer-icons/medium.png'
import Wechat from '../assets/footer-icons/wechat.png'
import wechatQrcode from '../assets/wechat_qrcode.jpeg'
import Discord from '../assets/footer-icons/discord.png'
import Github from '../assets/footer-icons/git.png'
import Linkein from '../assets/footer-icons/linkein.png'
import Email from '../assets/footer-icons/mail.png'

const ContentWrap = styled.div`
`
const HomeWrap = styled.div`
  width: 100%;
  padding: 3rem 0;
`
const Intro = styled.p`
  margin-top:5rem;
  font-size: 2.125rem;
  font-weight: bold;
`
const TitleBox = styled.div`
  font-size: 3.25rem;
  font-weight: bold;
  position: relative;
  margin-bottom: 4rem;
  margin-top: 2rem;
  div{
    z-index:3;
    position: inherit;
    text-align:center;
  }
  &:before{
    z-index:2;
    content:'';
    position:absolute;
    border-radius:50%;
    left: -1rem;
    top: -.6rem;
    display:block;
    width: 4rem;
    height:4rem;
    background: var(--primary-color);
  }
`
const Title: React.FC<BaseProps> = ({ children }) => {
  return (
    <TitleBox>
      <div>{children}</div>
    </TitleBox>
  )
}
export interface BaseProps {
  children?: React.ReactNode;
  className?: string;
}

const IntroBox = styled.div`
  margin-top: 11rem;
`
const WhatBox = styled(IntroBox)`
  padding-top: 12rem;
  padding-bottom: 16rem;
  position: relative;
`
const WhatText = styled.div`
position: relative;
left: 0;
top: 0;
z-index: 2;
display: flex;
-webkit-justify-content: space-between;
-moz-box-pack: justify;
-ms-flex-pack: justify;
justify-content: space-between;
padding: 0.6rem 1.3rem 0.77rem;
background-image: url(${dots}),linear-gradient(
-30deg,#f400b2,#e6007a);
background-size: auto 100%,auto;
background-position: 100%,50%;
background-repeat: no-repeat;
border-radius: 1.5rem;
margin-bottom: 1.33rem;
padding: 4rem 6rem;
font-size: 1.5rem;
font-weight:bold;
span{
  z-index:3;
}
&:before {
  z-index:2;
  position: absolute;
  content: "";
  left: -5rem;
  top: -4rem;
  background: black;
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  opacity:.1;
}
&:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1.5rem;
  left: 2rem;
  top: 2rem;
  z-index: 0;
  opacity: .24;
  background-color: -webkit-linear-gradient(
120deg,#f400b2,#e6007a);
  background-image: -moz-linear-gradient(120deg,#f400b2 0,#e6007a 100%);
  background-image: -o-linear-gradient(120deg,#f400b2 0,#e6007a 100%);
  background-image: linear-gradient(
-30deg,#f400b2,#e6007a);
}
`
const What = () => {
  return (
    <WhatBox ><div className="lineBox"> <div className="minLine line_1"></div> <div className="minLine line_2"></div> <div className="minLine line_3"></div> <div className="minLine line_4"></div> </div>
      <Center className='flex flex-column container'>
        <Title>What is a Crowdloan?</Title>
        <WhatText>
          <span>
            A crowdloan is a way for new projects to garner the support they need to connect to the
            Polkadot network as a parachain. A crowdloan participant can show their support for a project by locking up their DOT for the length of the parachain lease in exchange for a reward, usually in the form of the project’s native token. In most cases, those contributions will pay for the parachain slot lease and generate rewards in the parachain’s native token. When the parachain lease expires, the locked DOT is returned to the user.
          </span>
        </WhatText>
      </Center>
    </WhatBox>
  )
}
const WhyBox = styled.div`
  background: url(${p2Bg})center no-repeat;
  background-size:120%;
  padding-bottom:17rem;
`
const Why = () => {
  return (
    <WhyBox>
      <Center className="container flex flex-column">
        <Title>
          Why host a Crowdloan and
          <br />
          how does it work?
        </Title>
        <Flex w='100%'>
          <Flex justifyContent='end' w={['100%', '50%']}>
            <Image
              mr='2rem'
              boxSize='140px'
              objectFit='contain'
              src={`${p2Icon1}`} alt='kylin crowdloan' />
          </Flex>
          <Box w={['100%', '50%']}>
            <Heading fontSize='1.75rem' mb='1rem' color='pink.200'>
              Parachain Slot Auction
            </Heading>
            <Text fontSize='xl'>Polkadot is a decentralized, multi-chain network that allows
              blockchains to connect for interoperability, scalability, and
              plug-and-play network security. To join Polkadot’s network,
              all parachains must participate in and win an auction to earn
              a slot on the network. Parachains can choose to raise DOT in
              a variety of ways in order to participate in the auction.</Text>
          </Box>
        </Flex>
        <Flex w='100%' mt='5rem' mb='5rem'>
          <Flex justifyContent='end' w={['100%', '50%']}>
            <Image
              mr='2rem'
              boxSize='140px'
              objectFit='contain'
              src={`${p2Icon2}`} alt='kylin crowdloan' />
          </Flex>
          <Box w={['100%', '50%']}>
            <Heading fontSize='1.75rem' mb='1rem' color='pink.200'>
              Kylin (KYL) Distribution
            </Heading>
            <Text fontSize='xl'>
              When Kylin wins a parachain slot auction, the network will
              begin to launch on Polkadot and Kylin will distribute KYL to
              crowdloan contributors. Kylin supporters will be distributed
              KYL to the same account they used when contributing KYL
              to the crowdloan. The amount of KYL distributed is
              dependent on the amount of KYL contributed.</Text>
          </Box>
        </Flex>
        <Flex w='100%'>
          <Flex justifyContent='end' w={['100%', '50%']}>
            <Image
              mr='2rem'
              boxSize='140px'
              objectFit='none'
              src={`${p2Icon3}`} alt='kylin crowdloan' />
          </Flex>
          <Box w={['100%', '50%']}>
            <Heading fontSize='1.75rem' mb='1rem' color='pink.200'>
              Kylin’s Crowdloan
            </Heading>
            <Text fontSize='xl'>Crowdloans are a way for projects to fundraise for a
              parachain slot on the Polkadot network. An individual can
              temporarily lock their DOT in exchange for a reward from
              the project team, often in the form of the project’s native
              tokens. The contributed DOT are used to help parachain
              projects launch to the network, and are returned to the
              crowdloan participant once the parachain lease ends.</Text>
          </Box>
        </Flex>
      </Center>

    </WhyBox>
  )
}
const RewardBox = styled(Flex)`
  position:relative;
  background:#181818;
  overflow:hidden;
  &:before{
    content:'';
    display:block;
    position:absolute;
    z-index:1;
    opacity:0;
    width:100%;
    height:100%;
    top:0;
    left:0;
    background: linear-gradient(#e6007a,#f400b2);
    transition:all ease .4s;
  }
  &:hover::before{
    opacity:1;
  }
`
const RewardWrap = styled.div`
  margin-bottom:15rem;
`

const Reward = () => {
  return (
    <RewardWrap>
      <Center className="container flex flex-column">
        <Title>Crowdloan Rewards</Title>
        <SimpleGrid w='80%' minChildWidth='376px' spacing='2rem'>
          <RewardBox borderRadius='1.2rem' pl='2rem' pr='2rem' pt='4rem' pb='4rem' direction='column' alignContent='center' alignItems='center'>
            <Image zIndex={2} boxSize='8rem' mb='3.5rem' src={p3Icon1} alt='kylin crowdloan'></Image>
            <Heading zIndex={2} mb='2rem' fontSize='2rem'>Total Reward Pool</Heading>
            <Text zIndex={2} fontSize='xl' textAlign='center'>
              14% of total supply as Kylin
              <br />
              Network crowdloan Reward to all
              <br />
              the DOT contributors.
            </Text>
          </RewardBox>
          <RewardBox borderRadius='1.2rem' pl='2rem' pr='2rem' pt='4rem' pb='4rem' direction='column' alignContent='center' alignItems='center'>
            <Image zIndex={2} boxSize='8rem' mb='3.5rem' src={p3Icon2} alt='kylin crowdloan'></Image>
            <Heading zIndex={2} mb='2rem' fontSize='2rem'>Early Bird Reward</Heading>
            <Text zIndex={2} fontSize='xl' textAlign='center'>
              1% will be an early bird reward to
              <br />
              the first 10% DOT contributors.
            </Text>
          </RewardBox>
          <RewardBox borderRadius='1.2rem' pl='2rem' pr='2rem' pt='4rem' pb='4rem' direction='column' alignContent='center' alignItems='center'>
            <Image zIndex={2} boxSize='8rem' mb='3.5rem' src={p3Icon3} alt='kylin crowdloan'></Image>
            <Heading zIndex={2} mb='2rem' fontSize='2rem'>Your KYL Reward</Heading>
            <Text zIndex={2} fontSize='xl' textAlign='center'>
              Your KYL tokens reward = (Your
              DOT contribution/Kylin Total
              DOT) * 14% of total supply +
              Your early-bird DOT contribution/
              (10%*Kylin Total DOT) * 1% of
              total supply
            </Text>
          </RewardBox>
          <RewardBox borderRadius='1.2rem' pl='2rem' pr='2rem' pt='4rem' pb='4rem' direction='column' alignContent='center' alignItems='center'>
            <Image zIndex={2} boxSize='8rem' mb='3.5rem' src={p3Icon4} alt='kylin crowdloan'></Image>
            <Heading zIndex={2} mb='2rem' fontSize='2rem'>Reward Distributions</Heading>
            <Text zIndex={2} fontSize='xl' textAlign='center'>
              30% rewards will be distributed
              when parachain launches. The
              remaining 70% rewards will be
              distributed by block in the next
              96 weeks.
            </Text>
          </RewardBox>
        </SimpleGrid>
      </Center>
    </RewardWrap>
  )
}

const LocationWrap = styled.div`
  background: linear-gradient(180deg,#000 70%,#3F1123);`

const Location = () => {
  return (
    <LocationWrap>
      <Center className="container flex flex-column" pb='16rem'>
        <Title>Crowdloan Location</Title>
        <br />
        <Heading size='md' color='pink.500'>
          Official Location
        </Heading>
        <Logo style={{ marginLeft: '1.5rem' }} width='150' height='60' />
        <Heading size='md' mt='4rem' mb='1rem' color='pink.500'>
          Other Ways
        </Heading>
        <img src={OtherWays} alt='kylin crowdloan'></img>
      </Center>
    </LocationWrap>
  )
}
const WechatBox = styled.div`
  cursor:pointer;
  position:relative;

  .pop{
    display:none;
    position:absolute;
    left:-3.5rem;
    top:-11rem;
    width:10rem;
    height:10rem;
  }

  &:hover{
    background:var(--primary-color);
    border-radius:50%;
    .pop{
      display:block;
    }
  }
`
const FooterSecTitle = styled(Text)`
position:relative;
  &:before{
    content:'';
    position:absolute;
    left:0;
    top:2rem;
    width: 2rem;
    height:2px;
    background: gray;
  }
`
const SocialBox = styled(Flex)`
  a,div{
    margin-right:1rem;
  }
  a{
    display:inline-block;
    &:hover{
      background:var(--primary-color);
      border-radius:50%;
    }
  }
`
const Footer = () => {
  return (
    <Center p='4rem'>
      <Flex className="container">
        <Flex className='' w={['100%', '50%']} direction='column'>
          <Logo width={150} height={60} />
          <Text fontSize='.75rem' color={'#777'}>Copyright: 2021 The Pichiu Project. All Rights Reserved</Text>
          <SocialBox mt='1rem' direction='row'>
            <a href="https://t.me/KylinOfficial"><img src={Telegram} alt="" /></a>
            <a href="https://kylinnetwork.medium.com/"><img src={Medium} alt="" /></a>
            <a href="https://twitter.com/Kylin_Network"><img src={Twitter} alt="" /></a>
            <WechatBox>
              <div className="pop">
                <img src={wechatQrcode} alt="" />
              </div>
              <img src={Wechat} alt="" />
            </WechatBox>
            <a href="https://discord.gg/PwYCssr"><img src={Discord} alt="" /></a>
            <a href="https://github.com/Kylin-Network"><img src={Github} alt="" /></a>
            <a href="https://www.linkedin.com/company/kylin-network/?viewAsMember=true"><img src={Linkein} alt="" /></a>
            <a href="mailto:info@kylin.network"><img src={Email} alt="" /></a>
          </SocialBox>
        </Flex>
        <Flex className='' w={['100%', '50%']} direction='column'>
          <FooterSecTitle fontSize='1rem' color='#999'>Disclaimer</FooterSecTitle>
          <Text fontSize='.75rem' mt='1rem' color={'#333'}>
            All the information on this website or other official channels is published for
            information purposes only and is only intended for institutional investors and
            sophisticated individual investors. Any services to be provided in the future
            will be subject to the terms of the legal agreements relating thereto. Nothing
            on this Site should be interpreted as the investment endorsement by Pichiu
            Network or any other person. Pichiu Network and its related services are not
            provided to any individual from the United States. Pichiu Network aims to
            build a cross-chain platform powering the data economy on Polkadot.
          </Text>
        </Flex>
      </Flex>
    </Center>
  )
}
interface HomeProps {
  updateContent: React.Dispatch<React.SetStateAction<string>>
}
const Home: React.FC<HomeProps> = ({ updateContent }) => {
  return (
    <div className='homeWrap'>
      <div className='container'>
        <HomeWrap>
          <Intro>
            Building a Cross-chain
            <br />
            Powering the Data Economy
            <br />
            on Polkadot
          </Intro>
          <br />
          <p>The Data Infrastructure for DeFi and Web 3.0 Powered by Polkadot</p>
          <div>
            <Stack mt='12' direction="row" spacing={4} align="center">
              <Button type='outline' onClick={() => updateContent('contribute')}>Contribute</Button>
              <Button onClick={() => updateContent('review')}>Check Reward</Button>
              {/* <Button borderRadius='20' variant='outline' colorScheme='pink' onClick={() => updateContent('claims')}>Claims</Button> */}
            </Stack>
          </div>
        </HomeWrap>

      </div>
      <What />
      <Why />
      <Reward />
      <Location />
      <Footer />
    </div>
  )
}
export const Content = () => {
  const [content, updateContent] = useState('home')
  return (
    <ContentWrap className='contentWrap'>
      {content === 'home' && (<Home updateContent={updateContent} />)}
      {content === 'contribute' && (<Contribute />)}
      {content === 'review' && (<Review />)}
      {/* {content === 'claims' && (<Claims />)} */}
    </ContentWrap>
  )
}
