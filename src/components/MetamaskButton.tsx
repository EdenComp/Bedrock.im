import {useUserContext} from "../context/useUserContext.tsx";
import {useMemo} from "react";

export default function MetaMaskButton() {
  const { metamask } = useUserContext();

  const metamaskText = useMemo(() => {
    if (!metamask.hasProvider) {
      return "MetaMask not installed";
    } else if (metamask.isConnecting) {
      return "Connecting...";
    } else if (metamask.wallet.accounts.length > 0) {
      return `Connected with address ${metamask.wallet.accounts[0].slice(0, 8)}...`;
    }
    return "Sign in";
  }, [metamask.hasProvider, metamask.isConnecting, metamask.wallet.accounts]);

  return (
    <button
      disabled={!metamask.hasProvider || metamask.isConnecting || metamask.wallet.accounts.length > 0}
      onClick={() => metamask.connectMetaMask()}
    >
      {metamaskText}
    </button>
  );
}
