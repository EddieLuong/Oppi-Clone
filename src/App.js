import "./App.css";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import React from "react";
import { Route, Routes } from "react-router-dom";
import LogIn from "./containers/Login";
import Polllist from "./containers/Polllist";
import PollDetail from "./containers/PollDetail";
import GlobalStyle from "./components/styles/globalStyles";
import ProtectedRoute from "./components/ProtectedRoute.js";
import { Navigate } from "react-router-dom";
export const history = createBrowserHistory();

function App() {
  const accessToken = sessionStorage.getItem("AdminAccessToken");
  const cacheUrl = localStorage.getItem("CACHED_URL");
  return (
    <React.Fragment>
      <GlobalStyle />
      <HistoryRouter history={history}>
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
            path={`/poll-detail/:pollId`}
            element={
              <ProtectedRoute>
                <PollDetail />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </HistoryRouter>
    </React.Fragment>
  );
}

export default App;
