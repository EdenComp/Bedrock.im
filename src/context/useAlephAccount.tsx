import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import {useAccount} from "wagmi";
import {ETHAccount, getAccountFromProvider} from "@aleph-sdk/ethereum";

interface AlephAccount {
  account: ETHAccount | null
}

const AlephContext = createContext<AlephAccount | null>(null);

export const AlephContextProvider = ({ children }: PropsWithChildren) => {
  const account = useAccount()
  const [alephAccount, setAlephAccount] = useState<ETHAccount | null>(null)

  const connectAleph = useCallback(async () => {
    try {
      const account = await getAccountFromProvider(window.ethereum)
      setAlephAccount(account)
    } catch (e) {
      console.error(e)
    }
  }, []);

  if (!window.ethereum || !account.isConnected || alephAccount) {
    return (
      <AlephContext.Provider value={{
        account: alephAccount
      }}>
        {children}
      </AlephContext.Provider>
    );
  }
  connectAleph();

  return (
    <AlephContext.Provider value={{
      account: alephAccount
    }}>
      {children}
    </AlephContext.Provider>
  );
};

export const useAlephAccount = () => {
  const context = useContext(AlephContext);
  if (context === undefined) {
    throw new Error('useAlephAccount must be used within a "AlephAccountProvider"');
  }
  return context;
};
