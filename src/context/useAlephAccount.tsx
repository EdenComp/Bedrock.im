import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { ETHAccount, GetAccountFromProvider } from 'aleph-sdk-ts/dist/accounts/ethereum'

const AlephContext = createContext<ETHAccount | null>(null)

export const AlephContextProvider = ({children}: PropsWithChildren) => {
  const account = useAccount()
  const [alephAccount, setAlephAccount] = useState<ETHAccount | null>(null)
  const {disconnect} = useDisconnect()

  const connectAleph = useCallback(async () => {
    try {
      const account = await GetAccountFromProvider(window.ethereum)
      await account.askPubKey()
      setAlephAccount(account)
    } catch (e) {
      disconnect()
      console.error(e)
    }
  }, [disconnect])

  useEffect(() => {
    if (!account.isConnected) {
      setAlephAccount(null)
    }
  }, [account])

  if (!window.ethereum || !account.isConnected || alephAccount) {
    return (
      <AlephContext.Provider value={alephAccount}>
        {children}
      </AlephContext.Provider>
    )
  }
  connectAleph()

  return (
    <AlephContext.Provider value={alephAccount}>
      {children}
    </AlephContext.Provider>
  )
}

export const useAlephAccount = (): ETHAccount | null => {
  const context = useContext(AlephContext)
  if (context === undefined) {
    throw new Error('useAlephAccount must be used within a "AlephAccountProvider"')
  }
  return context
}
