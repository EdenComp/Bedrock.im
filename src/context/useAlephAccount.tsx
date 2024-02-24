import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext, useEffect,
  useState,
} from "react";
import {useAccount} from "wagmi";
import {
  ETHAccount,
  GetAccountFromProvider
} from 'aleph-sdk-ts/dist/accounts/ethereum'

export interface AlephAccount {
  account: ETHAccount | null
}

const AlephContext = createContext<AlephAccount | null>(null);

export const AlephContextProvider = ({ children }: PropsWithChildren) => {
  const account = useAccount()
  const [alephAccount, setAlephAccount] = useState<AlephAccount | null>(null)

  const connectAleph = useCallback(async () => {
    try {
      const account = await GetAccountFromProvider(window.ethereum)
      setAlephAccount({ account })
    } catch (e) {
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
