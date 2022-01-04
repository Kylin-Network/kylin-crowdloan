import { useContext } from 'react'
import { WalletContext, WalletData } from '../components/WalletProvider'

export const useWallet =(): WalletData =>{
  return useContext(WalletContext)
}