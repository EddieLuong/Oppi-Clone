import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./Component/LogIn.tsx";
import Polllist from "./Component/Polllist";

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
