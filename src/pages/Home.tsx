import Layout from "../components/Landing/Layout.tsx";
import type { ReactElement } from "react";
import { ContainerScroll } from "../components/ui/container-scroll-animation.tsx";

export default function Home(): ReactElement {
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
          onClick={() => (window.location.href = "/pricing")}
        >
          Get Started
        </button>
      </div>
    </Layout>
  );
}

export const users = [
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://picsum.photos/id/10/300/300",
    badge: "Mentor",
  },
];
