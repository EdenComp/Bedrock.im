import { ReactElement, useContext } from "react";
import MetamaskButton from "./Navbar/MetamaskButton.tsx";
import { AlephContext } from "../../../context/AlephContext.tsx";

const NavBarTab = ({ page }: any): ReactElement => {
  return (
    <li key={page.name}>
      <a
        href={page.href}
        className="block py-2 px-3 text-text-1 bg-blue-700 rounded md:bg-transparent md:p-0 hover:text-text-2"
        aria-current="page"
      >
        {page.name}
      </a>
    </li>
  );
};

export default function NavBar({ brandName = "Bedrock.im" }: { brandName?: string }): ReactElement {
  const pages = [
    { name: "Home", href: "/", current: true },
    { name: "Pricing", href: "/pricing", current: false },
    { name: "Team", href: "/team", current: false },
  ];

  const alephAccount = useContext(AlephContext);
  if (alephAccount) pages.push({ name: "Notes", href: "/notes", current: false });

  return (
    <nav className="bg-background-2 fixed w-full z-20 top-0 start-0 border-b border-border-1">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo-viol.png" className="h-12" alt="Bedrock Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-text-1">{brandName}</span>
        </a>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <MetamaskButton />
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-text-1 rounded-lg md:hidden hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 h-full"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
            {pages.map(
              (page, i): ReactElement => (
                <NavBarTab key={i} page={page} />
              ),
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
