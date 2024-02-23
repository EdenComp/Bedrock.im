import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext, useEffect, useMemo,
  useState
} from "react";
import detectEthereumProvider from "@metamask/detect-provider";

interface WalletState {
  accounts: any[];
  chainId: string;
}

interface MetaMaskContextData {
  wallet: WalletState;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  connectMetaMask: () => void;
  clearError: () => void;
  isLoggedIn: boolean;
}

interface UserContextData {
  metamask: MetaMaskContextData;
}

const disconnectedState: WalletState = { accounts: [], chainId: "" };

const UserContext = createContext<UserContextData>(null as unknown as UserContextData);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const clearError = () => setErrorMessage("");

  const [wallet, setWallet] = useState(disconnectedState);
  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts = providedAccounts || (await window.ethereum.request({ method: "eth_accounts" }));

    if (accounts.length === 0) {
      setWallet(disconnectedState);
      return;
    }

    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    setWallet({ accounts, chainId: chainId as string });
  }, []);

  const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet]);
  const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet]);

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        updateWalletAndAccounts();
        window.ethereum.on("accountsChanged", updateWallet);
        window.ethereum.on("chainChanged", updateWalletAndAccounts);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", updateWallet);
      window.ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
    };
  }, [updateWallet, updateWalletAndAccounts]);

  const connectMetaMask = async () => {
    setIsConnecting(true);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      clearError();
      updateWallet(accounts);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };

  const isLoggedToMetamask = useMemo<boolean>(() => wallet.accounts.length > 0, [wallet]);

  return (
    <UserContext.Provider
      value={{
        metamask: {
          wallet,
          hasProvider,
          error: !!errorMessage,
          errorMessage,
          isConnecting,
          connectMetaMask,
          clearError,
          isLoggedIn: isLoggedToMetamask,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a "UserContextProvider"');
  }
  return context;
};
