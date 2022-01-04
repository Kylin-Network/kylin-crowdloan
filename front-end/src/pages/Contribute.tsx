import React, { useState } from 'react'
import { CompletedHandler, ProgressBar } from '../components/ProgressBar'
import styled from 'styled-components'
import { Flex, Box, Heading, Checkbox, Text, SimpleGrid, VStack, Center } from '@chakra-ui/react'
import { Button } from '../components/Button'
import { Connect } from '../components/Connect'
import { SelectAccount } from '../components/SelectAccount'
import { SignAndSend } from '../components/SignAndSend'
import { ConfirmContribute } from '../components/ConfirmContribute'
import { useWallet } from '../hooks'
import Identicon from '@polkadot/react-identicon'
import { formatLongString } from '../utils'

const ContributeWrap = styled.div`
  position:relative;
  width: 100%;
  min-height:90vh;
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
const WelcomeWrap = styled.div`
  
`
const Welcome: React.FC<CompletedHandler> = ({ setCompleted }) => {
  return (
    <WelcomeWrap className='align-center'>
      <Heading color='white' size='md'>Step 1</Heading>
      <Heading color={'pink.200'} m='3rem'>Welcome to the <br /> Kylin Crowdloan Campaign</Heading>
      <Flex alignItems='start'>
        <Box display='inline-block' textAlign={'left'} width={["100%", "33%"]} p='1rem'>
          <Heading mb='.5rem' size={'md'} color={'pink.200'}>Expiration</Heading>
          <Text color='white' fontSize='1rem'>
            The Kylin crowdloan is now open and accepting contributions. This crowdloan will remain open until December 16th, 2021 at 03:00 UTC or until a parachain slot is secured by winning an auction, whichever comes first.
          </Text>
        </Box>
        <Box display='inline-block' width={["100%", "33%"]} textAlign={'left'} p='1rem'>
          <Heading mb='.5rem' size={'md'} color={'pink.200'}>Terms and conditions</Heading>
          <Text color='white' fontSize='1rem'>
            In order to participate, you will need to agree to the Kylin Crowdloan Terms and Conditions.
          </Text>
        </Box>
        <Box display='inline-block' width={["100%", "33%"]} textAlign={'left'} p='1rem'>
          <Heading mb='.5rem' size={'md'} color={'pink.200'}>Pre-registered </Heading>
          <Text color='white' fontSize='1rem'>
            The Kylin crowdloan is now open and accepting contributions. This crowdloan will remain open until December 16th, 2021 at 03:00 UTC or until a parachain slot is secured by winning an auction, whichever comes first.
          </Text>
        </Box>
      </Flex>
      <Button mb='5rem' onClick={() => setCompleted(1)}>Start</Button>
    </WelcomeWrap>)
}
const Terms: React.FC<CompletedHandler> = ({ setCompleted }) => {
  const [isAgreed, setIsAgreed] = useState(false)

  const handleCheck = (e: any) => {
    setIsAgreed(e.target.checked)
  }
  return (
    <div className='align-center'>
      <Heading color='white' size='md'>Step 4</Heading>
      <Heading color={'pink.200'} m='3rem'>Kylin Crowdloan Terms and Conditions</Heading>
      <Box textAlign='left' p='2rem' aria-disabled={true} borderRadius='20' border='1px' borderColor="gray.300" m='12'>
        <VStack align={'start'} spacing={'2rem'}>
          <div>
            By accessing the Kylin Crowdloan Application ("Kylin Crowdloan Application"), you represent and warrant to the Kylin Foundation LTD. ("Kylin Foundation") as follows:

          </div>

          <div>
            1.you are not a citizen or resident of a country the laws of which prohibit or conflict with the holding, sale, or trading of tokens; such countries to include (without limitation) THE UNITED STATES OF AMERICA, ITS TERRITORIES AND POSSESSIONS, ANY STATE OF THE UNITED STATES, AND THE DISTRICT OF COLUMBIA ("U.S."), CANADA, PEOPLE'S REPUBLIC OF CHINA, DEMOCRATIC PEOPLE'S REPUBLIC OF KOREA, CUBA, SYRIA, IRAN, SUDAN, PEOPLE'S REPUBLIC OF CRIMEA;
          </div>
          <div>
            2.you agree and acknowledge that nothing in the Kylin Crowdloan Application constitutes a prospectus or offer document of any sort nor is intended to constitute an offer of securities of any form, units in a business trust, units in a collective investment scheme, or any other form of capital markets product or investment in any jurisdiction, nor a solicitation for any form of investment;
          </div>
          <div>
            3.you agree and acknowledge that no regulatory authority has examined or approved the information set out in the Kylin Crowdloan Application and the publication, distribution, or dissemination of information under the Kylin Crowdloan Application does not imply to you that the applicable laws, regulatory requirements, or rules have been complied with;
          </div>
          <div>
            4.your access to, or use of, the Kylin Crowdloan Application and the holding of KYL tokens by you is not proh心ted or restricted by any applicable laws, regulations, or rules in any丿urisdiction to which you are subject, and where any restrictions are applicable, you have observed and complied with all such restrictions at your own expense and without liability to the Kylin Foundation;
          </div>
          <div>
            5.you agree and acknowledge that the Kylin Foundation shall not be liable for any direct, indirect, special, incidental, consequential, or other losses of any kind (including but not limited to loss of revenue, income or profits, and loss of use or data), in tort (including negligence), contract or otherwise, arising out of or in connection with you accessing or using the Kylin Crowdloan Application;
          </div>
          <div>
            6. you waive the right to participate in a class-action lawsuit or a class-wide arbitration against the Kylin Foundation, any person involved in the Kylin Crowdloan Application and/or with the creation and distribution of the KYL tokens;
          </div>
          <div>
            7. you are not a U.S. Person as defined in Regulation S under the Securities Act of 1933, as amended, which means that you are not a natural person resident in the United States of America, its territories and possessions, any State of the United States, and the District Of Columbia ("U.S."), an entity incorporated under the laws of the U.S., an estate/trust where the executor/administrator/trustee is a U.S. Person or a non-­discretionary account held for a U.S. Person, an agency or branch of a foreign entity located in the U.S., or an entity incorporated outside the U.S. but formed by a U.S. Person principally for the purposes of investing in unregistered securities under the Securities Act (unless incorporated and owned by accredited investors who are not natural persons, estates or trusts), and you acknowledge, agree and represent as follows:
            <br />
            •any offer, sale, and trade of the KYL tokens is being made in an offshore transaction, which means that the transaction was not effected in the U.S.;
            <br />
            •no direct ed selling efforts were made in the United States, which means that no marketing efforts were made to you in the U.S.;
            <br />
            •you are not acquiring KYL tokens for the account or benefit of any U.S. Person; and
            <br />
            •you agree not to offer or sell the KYL tokens (or create or maintain any derivative position equivalent thereto) in the U.S., to or for the account or benefit of a U.S. Person;
          </div>
          <div>
            8. you have sufficient funds to fulfill the obligations of the Kylin Foundation within the Kylin Crowdloan Application and are not bankrupt or insolvent;
          </div>
          <div>
            9. you are acquiring KYL tokens as principal and for your own benefit and you are not acting on the instructions of, or as nominee or agent for or on behalf of, any other person;
          </div>
          <div>
            10.the KYL tokens to be delivered to and received by you will not be used for any purpose in connection with money laundering, terrorism financing, or any other acts in breach or contravention of any applicable law, regulation, or rule;
          </div>
          <div>
            11.you bear the sole responsibility to determine what tax implications your use of the Kylin Crowdloan Application may have for you; and
          </div>
          <div>
            12.all of the above representations and warranties are and will continue to be, true, complete, accurate, and non-misleading from the time of your acceptance of this attestation and notwithstanding the receipt by you of any KYL tokens.
          </div>
        </VStack>
      </Box>
      <Checkbox onChange={(e) => handleCheck(e)}>I have read and agreed to the terms and conditions</Checkbox>
      <br />
      <Button mt='8' disabled={!isAgreed} onClick={() => setCompleted(4)}>Agree</Button>
    </div>
  )
}

const Contribution: React.FC = () => {
  const { contributed } = useWallet()
  return (
    <div className='align-center'>
      <Heading color='white' size='md'>Step 7</Heading>
      <Heading mt='3rem' mb='1rem' color='pink.200'>Transaction Successful!  </Heading>
      <Text pl='15rem' pr='15rem' mb='1rem'>{`You have successfully contributed ${contributed.amount} DOT to the Kylin crowdloan. These funds are now locked for the duration of the crowd loan, plus the duration of the parachain slot (96 weeks) if an auction is won.`}</Text>
      <Center>
        <Box w='40rem' bg='#181818' p='3rem' borderRadius='2rem'>
          <Heading color='pink.200' size='md'>DOT address</Heading>

          <Flex mt='4' mb='4' alignItems='center' justify='center'>
            <Identicon
              value={contributed.address}
              size={32}
              theme={'polkadot'}
            />
            <Text ml='1rem'>{contributed.address}</Text>
          </Flex>
          <Heading mt='2rem' color='pink.200' size='md'>Amount to contribute</Heading>
          <p>{contributed.amount} DOT</p>
          <Heading mt='2rem' color='pink.200' size='md'>Contribution transaction hash</Heading>
          <p>
            <a style={{color: 'white'}} href={`https://polkadot.subscan.io/extrinsic/${contributed.hash}`} rel='noreferrer noopener' target='_blank'>
              {formatLongString(contributed.hash)}
            </a>
          </p>
        </Box>
      </Center>
    </div>
  )
}
export const Contribute = () => {
  const [completed, setCompleted] = useState(0)
  return (
    <ContributeWrap>
      <div className="container">

        <ProgressBar steps={6} completed={completed} />
        {completed === 0 && <Welcome setCompleted={setCompleted} />}
        {completed === 1 && <Connect stepText={'Step 2'} onCompleted={() => setCompleted(2)} />}
        {completed === 2 && (
          <SelectAccount stepText='Step 3' isVerify onCompleted={() => setCompleted(3)}>
            <SimpleGrid mt='8' columns={3} pl='2rem' pr='2rem'>
              <Box display='inline-block' textAlign={'left'} pl='3rem' pr='3rem' mb='3rem'>
                <Heading mb='.5rem' size={'md'} color={'pink.200'}>Select an account </Heading>
                <Text color='white' fontSize='1rem'>
                  Select the Polkadot address you will use to fund your crowdloan contribution. The DOT you plan to use must be unlocked and transferable.
                </Text>

              </Box>
              <Box display='inline-block' textAlign={'left'} pl='3rem' pr='3rem' mb='3rem'>
                <Heading mb='.5rem' size={'md'} color={'pink.200'}>Pre-registered accounts </Heading>
                <Text color='white' fontSize='1rem'>
                  If you have completed the Pre-Registration, please ensure you are using the same address you used when signing that transaction.
                </Text>
              </Box>
              <Box display='inline-block' textAlign={'left'} pl='3rem' pr='3rem' mb='3rem'>
                <Heading mb='.5rem' size={'md'} color={'pink.200'}>Sign message </Heading>
                <Text color='white' fontSize='1rem'>
                  We will ask you to sign a message to verify your ownership of the account. This message is not a transaction, and it doesn't cost any fees.
                </Text>
              </Box>
              {/* <Box display='inline-block' textAlign={'left'} pl='3rem' pr='3rem' mb='3rem'>
                <Heading mb='.5rem' size={'md'} color={'pink.200'}>Advanced Users </Heading>
                <Text color='white' fontSize='1rem'>
                  A "Non-Transfer" proxy account can be used to contribute to the crowdloan, adding an extra layer of security. These proxy accounts are also compatible with Ledger Hardware wallets. Ledger Hardware Wallets do not support Crowdloan Contributions directly.
                </Text>
              </Box> */}
            </SimpleGrid>
          </SelectAccount>
        )}
        {completed === 3 && <Terms setCompleted={setCompleted} />}
        {completed === 4 && <SignAndSend setCompleted={setCompleted} />}
        {completed === 5 && <ConfirmContribute setCompleted={setCompleted} />}
        {completed === 6 && <Contribution />}

      </div>
    </ContributeWrap>
  )
}
