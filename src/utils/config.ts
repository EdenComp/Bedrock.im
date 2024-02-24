import {createConfig, http} from "wagmi";
import {mainnet} from "viem/chains";
import {injected} from "wagmi/connectors";

export const alephApiServer = "https://api2.aleph.im"
export const alephPostType = "test"
export const alephChannel = "TEST"

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
