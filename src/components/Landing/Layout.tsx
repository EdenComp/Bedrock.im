import NavBar from "../Basic/NavBar.tsx";
import type { ReactElement } from 'react';
import Footer from "../Basic/Footer.tsx";

export default function Layout({ children }: { children: ReactElement[] | ReactElement }): ReactElement {
  return (
    <div className={`bg-gray-700 min-h-screen w-full`}>
      <NavBar />
      <div className="justify-center items-center flex flex-col pt-20 bg-gray-700 h-full w-full text-white">
        {children}
      </div>
      <Footer />
    </div>
  )
}