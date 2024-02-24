import {PropsWithChildren} from "react";
import {AlephContextProvider} from "../context/useAlephAccount.tsx";
import {WagmiProvider} from "wagmi";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {wagmiConfig} from "./config.ts";

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
