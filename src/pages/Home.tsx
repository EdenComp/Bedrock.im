import Layout from "../components/Landing/Layout.tsx";
import { ReactElement, useContext } from "react";
import { ContainerScroll } from "../components/ui/container-scroll-animation.tsx";
import { AlephContext } from "../context/AlephContext.tsx";
import { useConnect } from "wagmi";
import { wagmiConfig } from "../utils/config.ts";
import { mainnet } from "viem/chains";

export default function Home(): ReactElement {
  const account = useContext(AlephContext);
  const { connect } = useConnect({
    config: wagmiConfig,
  });

  return (
    <Layout>
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-9xl font-extrabold text-text-1">
                Bedrock.im
                <br />
                <span className="text-5xl font-bold leading-none text-text-2">
                  Welcome to your decentralized future.
                </span>
              </h1>
            </>
          }
        />
        <button
          className="bg-card text-text-1 p-4 rounded-lg mb-20 w-1/4 mx-auto transition-colors duration-300 hover:shadow-lg bg-interactive-1 hover:bg-interactive-2 active:bg-interactive-3 border border-border-1 hover:border-border-2 active:border-border-3"
          onClick={() => {
            if (account) {
              window.location.href = "/notes";
            } else {
              connect({
                chainId: mainnet.id,
                connector: wagmiConfig.connectors[0],
              });
            }
          }}
        >
          Get Started
        </button>
      </div>
    </Layout>
  );
}
