import { ReactElement } from 'react'
import Sidebar from "../components/Product/Sidebar.tsx";

export default function Notes(): ReactElement {
  return (
    <div className="min-w-screen min-h-screen bg-background-1">
      <Sidebar />
    </div>
  )
}
