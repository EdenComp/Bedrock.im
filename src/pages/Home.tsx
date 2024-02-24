import Layout from "../components/Landing/Layout.tsx";
import type { ReactElement } from 'react';
import Text from "../components/Basic/Text.tsx";

export default function Home(): ReactElement {
  return (
    <Layout>
      <Text className="text-9xl font-bold">Bedrock.im</Text>
      <Text className="text-2xl font-normal">Welcome to your new app.</Text>
      <Text className="text-2xl font-normal">This is a simple starter template for a React app with TypeScript, Tailwind CSS, and Vite.</Text>
      <Text className="text-9xl font-bold">HOME</Text>
    </Layout>
  )
}