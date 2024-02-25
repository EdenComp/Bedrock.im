import { createConfig, http } from "wagmi";
import { mainnet } from "viem/chains";
import { injected } from "wagmi/connectors";

export const alephPostType = "test-bedrock";
export const alephChannel = "TEST-BEDROCK";
export const alephAggregateKey = "test-bedrock";

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [
    injected({
      target() {
        return {
          id: "windowProvider",
          name: "Window Provider",
          provider: window.ethereum,
        };
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
  },
});
