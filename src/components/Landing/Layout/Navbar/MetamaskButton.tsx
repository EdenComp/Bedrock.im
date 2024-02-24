import { useAccount, useConnect, useDisconnect } from "wagmi";
import { mainnet } from "viem/chains";
import { wagmiConfig } from "../../../../utils/Providers.tsx";
import { useState, useEffect, useRef } from "react";

export default function MetamaskButton() {
  const [isOpen, setIsOpen] = useState(false);
  const account = useAccount();
  const { connect } = useConnect({
    config: wagmiConfig,
  });
  const { disconnect } = useDisconnect();
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 disabled:bg-gray-500 disabled:cursor-not-allowed"
        disabled={account.isConnecting}
        onClick={() => {
          if (!account.isConnected) {
            connect({
              chainId: mainnet.id,
              connector: wagmiConfig.connectors[0],
            });
          } else {
            setIsOpen(!isOpen);
          }
        }}
        title={account?.address}
      >
        <img
          src={"https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"}
          alt={"Metamask"}
          className={"h-5 w-5 inline-block mr-2"}
        />
        {account.isConnected
          ? account.address?.slice(0, 6) + "..." + account.address?.slice(-4)
          : "Connect"}
      </button>
      {isOpen && (
        <div className={"absolute top-10 right-0 bg-gray-600 p-2 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out hover:bg-red-500 w-full"}>
          <button
            className={"text-white w-full text-center py-2 px-4 focus:outline-none"}
            onClick={() => {
              disconnect();
              setIsOpen(false);
            }}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
