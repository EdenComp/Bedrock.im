import {useAccount, useConnect, useDisconnect} from "wagmi";

import {mainnet} from "viem/chains";
import {wagmiConfig} from "../../../../utils/Providers.tsx";
import {useState} from "react";

export default function MetamaskButton() {
  const [isOpen, setIsOpen] = useState(false)

  const account = useAccount()
  const { connect } = useConnect({
    config: wagmiConfig,
  })
  const { disconnect } = useDisconnect()

  return (
    <div className={'relative h-full'}>
    <button type="button"
            className={`text-white h-full font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed ${account?.isConnected && isOpen ? 'rounded-r-none hover:bg-blue-700' : ''}`}
            disabled={account.isConnecting}
            onClick={() => {
              if (!account.isConnected) {
                connect({
                  chainId: mainnet.id,
                  connector: wagmiConfig.connectors[0],
                })
              } else {
                setIsOpen(!isOpen)
              }
            }}
            title={account?.address}>
      <img src={'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg'} alt={'Metamask'}
           className={'h-5 w-5 inline-block mr-2'}/>
      {account.isConnected ? account.address?.slice(0, 6) + '...' + account.address?.slice(-4) : 'Connect'}
    </button>
      { account?.isConnected && isOpen && <button type="button"
            className="text-blue-600 hover:text-white font-medium rounded-lg text-sm px-4 py-2 text-center bg-white hover:bg-red-600 focus:ring-red-800 rounded-l-none absolute h-full"
            onClick={() => {
              disconnect()
              setIsOpen(false)
            }}
            title={account?.address}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
          </svg>
      </button>}
    </div>
  )
}