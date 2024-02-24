import {useAccount, useConnect, useDisconnect} from "wagmi";
import {wagmiConfig} from "../utils/Providers.tsx";
import {mainnet} from "viem/chains";

export default function MetaMaskButton() {
  const account = useAccount()
  const { connect } = useConnect({
    config: wagmiConfig,
  })
  const { disconnect } = useDisconnect()

  return (
    <button
      onClick={() => {
        if (!account.isConnected) {
          connect({
            chainId: mainnet.id,
            connector: wagmiConfig.connectors[0],
          })
        } else {
          disconnect()
        }
      }}
    >
      {account.isConnected ? "Disconnect" : "Connect"}
    </button>
  );
}
