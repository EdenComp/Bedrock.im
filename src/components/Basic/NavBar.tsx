import type { ReactElement } from 'react';

export default function NavBar(): ReactElement {
  const pages = [
    { name: 'Home', href: '/', current: true },
    { name: 'Documentation', href: '/documentation', current: false },
    { name: 'Pricing', href: '/pricing', current: false },
    { name: 'Team', href: '/team', current: false },
  ]
  return (
    <nav className="bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Bedrock.im</span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button type="button" className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
            <img src={'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg'} alt={'Metamask'} className={'h-5 w-5 inline-block mr-2'} />
            Metamask
          </button>
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 h-full" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            {pages.map((page): ReactElement => (
              <li key={page.name}>
                  <a href={page.href} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-500 md:p-0 hover:text-white"
                     aria-current="page">
                    {page.name}
                  </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
