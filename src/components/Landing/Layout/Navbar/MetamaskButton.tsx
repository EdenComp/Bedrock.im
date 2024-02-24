import {useAccount} from "wagmi";

export default function MetamaskButton() {

  const account = useAccount()

  return (
    <button type="button"
            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={account.isConnecting || !account.connector || account.isConnected}
            onClick={() => account.connector?.connect()}
            title={account?.address}>
      <img src={'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg'} alt={'Metamask'}
           className={'h-5 w-5 inline-block mr-2'}/>
      {account.isConnected ? account.address?.slice(0, 6) + '...' + account.address?.slice(-4) : 'Connect'}
    </button>
  )
}