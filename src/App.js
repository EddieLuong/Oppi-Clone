import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./Component/LogIn.tsx";
import Polllist from "./Component/Polllist.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />}></Route>

        <Route path="/polllist" element={<Polllist />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
