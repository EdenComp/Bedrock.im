import Layout from "../components/Landing/Layout.tsx";
import {ReactElement} from 'react';
import Text from "../components/Basic/Text.tsx";
import MetamaskButton from "../components/MetamaskButton.tsx";

export default function Home(): ReactElement {
  return (
    <Layout>
      <Text className="font-size-4xl font-bold">Hello, World!</Text>
      <Text className="font-size-2xl font-normal">Welcome to your new app.</Text>
      <Text className="font-size-2xl font-normal">This is a simple starter template for a React app with TypeScript, Tailwind CSS, and Vite.</Text>
      <Text className="font-size-9xl font-bold">HOME</Text>
      <MetamaskButton />
    </Layout>
  )
}
