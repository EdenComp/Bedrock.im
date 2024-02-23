import Layout from "../components/Landing/Layout.tsx";
import type { ReactElement } from 'react';
import Text from "../components/Basic/Text.tsx";

export default function Pricing(): ReactElement {
  return (
    <Layout>
      <Text className="size-4xl font-bold">Hello, World!</Text>
      <Text className="size-2xl font-normal">Welcome to your new app.</Text>
      <Text className="size-2xl font-normal">This is a simple starter template for a React app with TypeScript, Tailwind CSS, and Vite.</Text>
      <Text className="size-9xl font-bold">PRICING</Text>
    </Layout>
  )
}