import {useAccount} from "wagmi";
import {useAlephAccount} from "../context/useAlephAccount.tsx";

export default function MetaMaskButton() {
  const account = useAccount()
  const alephAccount = useAlephAccount()

  return (
    <button
      disabled={account.isConnecting || !account.connector || account.isConnected}
      onClick={() => account.connector?.connect()}
    >
      {account?.address}
    </button>
  );
}
