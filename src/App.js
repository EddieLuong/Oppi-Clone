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
import { ADMIN_TOKEN, CACHED_URL } from "./constants/localStorage";
import clientPath from "./constants/clientPath";
export const history = createBrowserHistory();

function App() {
  const { LOGIN, POLLLIST, POLLDETAIL, ROOT } = clientPath;
  const accessToken = sessionStorage.getItem(ADMIN_TOKEN);
  const cacheUrl = localStorage.getItem(CACHED_URL);
  return (
    <React.Fragment>
      <GlobalStyle />
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={LOGIN}
            element={accessToken ? <Navigate to={cacheUrl} /> : <LogIn />}
          ></Route>
          <Route
            path={POLLLIST}
            element={
              <ProtectedRoute>
                <Polllist />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path={POLLDETAIL}
            element={
              <ProtectedRoute>
                <PollDetail />
              </ProtectedRoute>
            }
          ></Route>
          <Route path={ROOT} element={<Navigate to={LOGIN} />}></Route>
        </Routes>
      </HistoryRouter>
    </React.Fragment>
  );
}

export default App;
