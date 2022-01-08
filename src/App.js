import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn.tsx";
import Polllist from "./components/Polllist";
import PollDetail from "./components/PollDetail.js";
import GlobalStyle from "./components/styles/globalStyles";
function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>

          <Route path="/polllist" element={<Polllist />}></Route>

          <Route path="/polldetail" element={<PollDetail />}></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
