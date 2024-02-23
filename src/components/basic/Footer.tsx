import type { ReactElement } from 'react'

export default function Footer(): ReactElement {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-600 absolute bottom-0 start-0 w-full z-20">
      <div className="max-w-screen-xl mx-auto p-4">
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">© 2021 CramptAleph. All rights reserved.</p>
      </div>
    </footer>
  )
}