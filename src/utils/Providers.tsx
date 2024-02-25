import {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {
  AlephContext,
} from "../context/AlephContext";
import {useAccount, useDisconnect} from "wagmi";
import {
  ETHAccount,
  GetAccountFromProvider
} from "aleph-sdk-ts/dist/accounts/ethereum";

export default function Providers({ children }: PropsWithChildren) {
  const account = useAccount()
  const {disconnect} = useDisconnect()
  const [alephAccount, setAlephAccount] = useState<ETHAccount | null>(null)
  const [isFetching, setIsFetching] = useState(false)

  const connectAleph = useCallback(async () => {
    if (!account.isConnected) return
    try {
      setIsFetching(true)
      const alephAccount = await GetAccountFromProvider(window.ethereum)
      await alephAccount.askPubKey()
      setAlephAccount(alephAccount)
    } catch (e) {
      disconnect()
      console.error(e)
    } finally {
      setIsFetching(false)
    }
  }, [account.isConnected, disconnect])

  useEffect(() => {
    if (!account.isConnected) {
      setAlephAccount(null)
    }
    if (window.ethereum && (!account.isConnected || !alephAccount) && !isFetching) {
      connectAleph()
    }
  }, [account])

  return (
    <AlephContext.Provider value={alephAccount}>
      {children}
    </AlephContext.Provider>
  );
}
