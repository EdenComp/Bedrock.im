import type { ReactElement } from 'react'

export default function Footer(): ReactElement {
  return (
    <footer className="bg-gray-900 border-t border-gray-600 fixed bottom-0 left-0 w-full z-20">
      <div className="max-w-screen-xl mx-auto p-4">
        <p className="text-center text-gray-400 text-sm">© 2024 Bedrock. All rights reserved.</p>
      </div>
    </footer>
  )
}