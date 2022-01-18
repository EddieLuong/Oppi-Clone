import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn.tsx";
import Polllist from "./components/Polllist";
import PollDetail from "./components/PollDetail.js";
import GlobalStyle from "./components/styles/globalStyles";
import ProtectedRoute from "./components/ProtectedRoute.js";
function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<LogIn />}></Route>

          <ProtectedRoute path="/polllist" element={<Polllist />}></ProtectedRoute>

          <ProtectedRoute path="/polldetail" element={<PollDetail />}></ProtectedRoute>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
