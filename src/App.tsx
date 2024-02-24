import Home from './pages/Home'
import Documentation from './pages/Documentation'
import Pricing from './pages/Pricing'
import Team from './pages/Team'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/documentation" Component={Documentation} />
        <Route path="/pricing" Component={Pricing} />
        <Route path="/team" Component={Team} />
      </Routes>
    </>
  )
}

export default App
