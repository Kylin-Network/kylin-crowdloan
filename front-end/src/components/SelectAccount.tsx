import { Heading, useToast } from "@chakra-ui/react";
import { Button } from '../components/Button'
import React, { useReducer } from "react";
import { useWallet } from "../hooks";
import { StepCompletedProps } from "../interface";
import { AccountSelector } from "./AccountSelector";
import { BaseProps } from "./Content";
import { web3FromSource } from "@polkadot/extension-dapp";
import { signatureVerify } from '@polkadot/util-crypto';
import keyring from '@polkadot/ui-keyring';
import { stringToHex } from '@polkadot/util';



interface SelectAccountProps extends BaseProps, StepCompletedProps {
  isVerify?: boolean;
}
export const SelectAccount: React.FC<SelectAccountProps> = ({ onCompleted, isVerify, children, stepText }) => {
  const { accounts, updateAccounts, message, setSignatrue, current, setCurrent } = useWallet()
  const [updater, updaterDispatch] = useReducer((c) => c + 1, 0);
  // const [current, setCurrent] = useState(accounts[0] ?? '')
  const toast = useToast()
  const handleChange = (val: any) => {
    setCurrent(val)
  }
  const handleVerify = async () => {
    if (!current.address) {
      toast({
        description: 'Please choose an account.'
      })
      return
    }

    const injector = await web3FromSource(current.meta.source);

    const signRaw = injector?.signer?.signRaw;
    try {

      if (!!signRaw) {
        // after making sure that signRaw is defined
        // we can use it to sign our message
        const { signature } = await signRaw({
          address: current.address,
          data: stringToHex(message),
          type: 'bytes'
        });
        console.log(`${(signature)}`);
        setSignatrue(signature)

        const publickey = keyring.decodeAddress(current.address)
        const verification = signatureVerify(message, signature, publickey)

        if (verification.crypto !== 'none' && verification.isValid) {
          onCompleted && onCompleted()
        } else {
          throw new Error('Error occured while verify signatrue.')
        }
      }
    } catch (err: any) {
      toast({
        status: 'error',
        position: 'top',
        title: err.message
      })
    }

  }
  const handleReview = () => {
    onCompleted && onCompleted()
  }
  const handleReload = () => {
    updaterDispatch()
    updateAccounts()
  }

  return (
    <div className='align-center'>
      <Heading color='white' size='md'>{stepText}</Heading>
      <Heading color={'pink.200'} m='3rem'>Select a Polkadot Account</Heading>
      {accounts.length &&
        (
          <AccountSelector updater={updater} accounts={accounts} onSelect={(val) => handleChange(val)} />
        )
      }
      {/* {process.env.NODE_ENV === 'development' && 
        <Button borderRadius='20' m='4' onClick={handleReview}>next</Button>
      } */}
      {isVerify ?
        <Button borderRadius='20' m='4' onClick={handleVerify}>Verify account</Button>
        :
        <Button borderRadius='20' m='4' onClick={handleReview}>Review account</Button>
      }
      <Button type='outline' variant='outline' borderRadius='20' onClick={handleReload}>Reload accounts</Button>
      <br />
      {children}
    </div>
  )
}
