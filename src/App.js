import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn.tsx";
import Polllist from "./components/Polllist";
import PollDetail from "./components/PollDetail.js";
import GlobalStyle from "./components/styles/globalStyles";
import ProtectedRoute from "./components/ProtectedRoute.js";
import { accessToken } from "./components/Utils";
import { Navigate } from "react-router-dom";
function App() {
  const cacheUrl = localStorage.getItem("CACHED_URL");
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={accessToken ? <Navigate to={cacheUrl} /> : <LogIn />}
          ></Route>
          <Route
            path="/polllist"
            element={
              <ProtectedRoute>
                <Polllist />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/polldetail"
            element={
              <ProtectedRoute>
                <PollDetail />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
