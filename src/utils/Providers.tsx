import {PropsWithChildren} from "react";
import {AlephContextProvider} from "../context/useAlephAccount.tsx";
import {createConfig, http, WagmiProvider} from "wagmi";
import {injected} from "wagmi/connectors";
import {mainnet} from "viem/chains";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [injected({
    target() {
      return {
        id: 'windowProvider',
        name: 'Window Provider',
        provider: window.ethereum,
      }
    }
  })],
  transports: {
    [mainnet.id]: http(),
  },
})
const queryClient = new QueryClient()

export default function Providers({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AlephContextProvider>
          {children}
        </AlephContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
