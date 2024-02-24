import NavBar from "./Layout/NavBar.tsx";
import type { ReactElement } from 'react';
import Footer from "./Layout/Footer.tsx";

export default function Layout({ children }: { children: ReactElement[] | ReactElement }): ReactElement {
  return (
    <div className={`bg-background-1 min-h-screen w-full`}>
      <NavBar />
      <div className="justify-center items-center flex flex-col pt-20 bg-background-1 h-full w-full text-text">
        {children}
      </div>
      <Footer />
    </div>
  )
}