import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext, useEffect,
  useState,
} from "react";
import {useAccount, useDisconnect} from "wagmi";
import {
  ETHAccount,
  GetAccountFromProvider
} from 'aleph-sdk-ts/dist/accounts/ethereum'
import {loadAggregate} from "../utils/aleph.ts";

export interface AlephAccountAggregate {
  items: string[]
}

export interface AlephAccount {
  account: ETHAccount
  data: AlephAccountAggregate
}

const AlephContext = createContext<AlephAccount | null>(null);

export const AlephContextProvider = ({ children }: PropsWithChildren) => {
  const account = useAccount()
  const [alephAccount, setAlephAccount] = useState<AlephAccount | null>(null)
  const { disconnect } = useDisconnect()

  const connectAleph = useCallback(async () => {
    try {
      const account = await GetAccountFromProvider(window.ethereum)
      const data = await loadAggregate(account)
      setAlephAccount({ account, data })
    } catch (e) {
      disconnect()
      console.error(e)
    }
  }, []);

  useEffect(() => {
    if (!account.isConnected) {
      setAlephAccount(null);
    }
  }, [account]);

  if (!window.ethereum || !account.isConnected || alephAccount) {
    return (
      <AlephContext.Provider value={alephAccount}>
        {children}
      </AlephContext.Provider>
    );
  }
  connectAleph();

  return (
    <AlephContext.Provider value={alephAccount}>
      {children}
    </AlephContext.Provider>
  );
};

export const useAlephAccount = (): AlephAccount | null => {
  const context = useContext(AlephContext);
  if (context === undefined) {
    throw new Error('useAlephAccount must be used within a "AlephAccountProvider"');
  }
  return context;
};
