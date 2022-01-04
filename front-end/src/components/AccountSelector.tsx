import React, { useEffect, useState } from 'react'
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { Select, Center, Alert, AlertIcon } from '@chakra-ui/react'

export interface AccountSelectorProps {
  accounts: InjectedAccountWithMeta[];
  onSelect: (val: any) => void;
  updater?: number;
}
export const AccountSelector: React.FC<AccountSelectorProps> = ({ accounts, onSelect, updater }) => {
  const [val,setVal] = useState(0)

  const handleChange = (e: any) => {
    const _val = typeof e === 'number' ? e : e.target.value
    setVal(_val)    
    onSelect && onSelect(accounts[_val])
  }

  useEffect(() => {
    handleChange(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updater])

  if (!accounts.length) {
    return (
      <Alert status="error">
        <AlertIcon />
        {`Please create an account on Polkadot{.js} Extension.`}
      </Alert>
    )
  }

  return (
    <Center mt='8' mb='8'>
      <Select borderColor={'var(--primary-color)'} fontSize={'.875rem'} textAlign={'center'} borderRadius={'2rem'} iconColor='var(--primary-color)' value={val} w='40rem' onChange={(e) => handleChange(e)}>
        {
          accounts.map((account, index) => (
            <option value={index} key={index}>{`${account.meta.name} - ${account.address}`}</option>
          ))
        }
      </Select>
    </Center>
  )
}
