import {useAccount} from "wagmi";

export default function MetaMaskButton() {
  const account = useAccount()

  return (
    <button
      disabled={account.isConnecting || !account.connector || account.isConnected}
      onClick={() => account.connector?.connect()}
    >
      {account?.address}
    </button>
  );
}
