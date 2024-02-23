import Home from './pages/Home'
import Documentation from './pages/Documentation'
import Pricing from './pages/Pricing'
import Team from './pages/Team'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/documentation" Component={Documentation} />
        <Route path="/Pricing" Component={Pricing} />
        <Route path="/team" Component={Team} />
      </Routes>
    </div>
  )
}

export default App
