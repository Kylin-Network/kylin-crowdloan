import { ApiPromise, WsProvider } from '@polkadot/api'
import React, { createContext, useCallback, useMemo, useState } from 'react'
import { BaseProps } from './Content'

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types'
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp'
import { useToast } from '@chakra-ui/toast'
import { Center } from '@chakra-ui/layout'

import { TypeRegistry } from '@polkadot/types/create';

const registry = new TypeRegistry();

export default registry;

export const DEFAULT_DECIMALS = registry.createType('u32', 12);

export interface WalletData {
  api?: ApiPromise;
  accounts: InjectedAccountWithMeta[];
  updateAccounts: () => Promise<void>;
  initWeb3Enable: () => Promise<void>;
  setApi: React.Dispatch<React.SetStateAction<ApiPromise>>;
  message: string;
  initApi: () => void;
  isApiConnected: boolean;
  isReady: boolean;
  apiError: string | null;
  signature: `0x${string}`;
  setSignatrue: React.Dispatch<React.SetStateAction<`0x${string}`>>;
  current: InjectedAccountWithMeta;
  setCurrent: React.Dispatch<React.SetStateAction<InjectedAccountWithMeta>>;
  Decimals: number;
  parachainId: string | undefined;
  contributed: {
    address: string;
    amount: number;
    hash: string;
  };
  setContributed: React.Dispatch<React.SetStateAction<{
    address: string;
    amount: number;
    hash: string;
  }>>;
}

export const WalletContext = createContext({} as unknown as WalletData)

// const TermsLink = process.env.REACT_APP_TERMS_LINK ?? ''

export const WalletProvider: React.FC<BaseProps> = ({ children }) => {
  const [api, setApi] = useState({} as ApiPromise)
  const [accounts, setAccounts] = useState([] as InjectedAccountWithMeta[])
  const [current, setCurrent] = useState({} as InjectedAccountWithMeta)
  const toast = useToast()
  const [isApiConnected, setIsApiConnected] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [apiError, setApiError] = useState<null | string>(null);
  const message = `I have read and agree to the notes and terms of kylin crowdloan.`
  const [signature, setSignatrue] = useState('0x00' as `0x${string}`)
  const [Decimals, setDecimals] = useState(0)
  const [contributed, setContributed] = useState({
    address: '',
    amount: 0,
    hash: ''
  })

  const parachainId = process.env.REACT_APP_PARACHAIN_ID

  const updateAccounts = useCallback(async () => {

    const injectedAccounts = await web3Accounts({ ss58Format: 0 })
    setAccounts(injectedAccounts)
    setCurrent(injectedAccounts[0])

  }, [])

  const initWeb3Enable = useCallback(async () => {

    const extensions = await web3Enable('Kylin Crowdloan')

    if (extensions.length === 0) {
      toast({
        duration: null,
        position: 'top',
        render: () => (
          <Center color="white" p={3} bg="red.500" borderRadius='12'>
            <a href="https://polkadot.js.org/extension/" style={{ textDecoration: 'underline' }} target="_blank" rel="noreferrer noopener">{`Please install Polkadot{.js} Extension`}</a>
          </Center>
        )
      })
      return
    }

    await updateAccounts()

  }, [toast, updateAccounts])

  const initApi = useCallback(() => {
    try {
      // const wsProvider = new WsProvider(process.env.REACT_APP_WESTEND)
      // const wsProvider = new WsProvider(process.env.REACT_APP_RPC_URL)
      const endpoint = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_RPC_URL : process.env.REACT_APP_RPC_TEST
      const wsProvider = new WsProvider(endpoint)
      const _api = new ApiPromise({ provider: wsProvider })
      _api.on('connected', () => setIsApiConnected(true));
      _api.on('disconnected', () => setIsApiConnected(false));
      _api.on('error', (error: Error) => setApiError(error.message));
      _api.on('ready', async () => {
        if (!current.address) {
          initWeb3Enable()
        }

        const injector = await web3FromAddress(current.address);
        _api.setSigner(injector.signer);

        const { tokenDecimals } = await _api.rpc.system.properties()
        setDecimals((tokenDecimals.unwrapOr([DEFAULT_DECIMALS]) as unknown as number[])[0])

        setApi(_api)
        setIsReady(true);
      });
    } catch (err: any) {
      throw new Error(err.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.address])

  const value = useMemo(() => {

    return {
      api,
      updateAccounts,
      accounts,
      setApi,
      initWeb3Enable,
      message,
      initApi,
      isApiConnected,
      apiError,
      isReady,
      signature,
      setSignatrue,
      current,
      setCurrent,
      Decimals,
      parachainId,
      contributed,
      setContributed
    }

  }, [api, updateAccounts, contributed, accounts, initWeb3Enable, message, initApi, isApiConnected, apiError, isReady, signature, current, Decimals, parachainId])
  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  )
}
