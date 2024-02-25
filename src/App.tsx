import Home from "./pages/Home";
import Pricing from "./pages/Pricing";
import Notes from "./pages/Notes";
import Team from "./pages/Team";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/pricing" Component={Pricing} />
        <Route path="/team" Component={Team} />
        <Route path="/notes" Component={Notes} />
      </Routes>
    </>
  );
}

export default App;
