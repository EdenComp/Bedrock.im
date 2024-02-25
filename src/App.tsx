import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Notes from "./pages/Notes";
import Team from "./pages/Team";
import Pastebim from "./pages/Pastebim.tsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/pricing" Component={Pricing} />
        <Route path="/team" Component={Team} />
        <Route path="/notes" Component={Notes} />
        <Route path="/pastebim" Component={Pastebim} />
      </Routes>
    </>
  );
}

export default App;
