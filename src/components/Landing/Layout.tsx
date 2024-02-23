import NavBar from "../Basic/NavBar.tsx";
import type { ReactElement } from 'react';
import Footer from "../Basic/Footer.tsx";

export default function Layout({ children }: { children: ReactElement[] | ReactElement }): ReactElement {
  return (
    <div>
      <NavBar />
      <div className="justify-center items-center flex flex-col mt-20">
        {children}
      </div>
      <Footer />
    </div>
  )
}