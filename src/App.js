import "./App.css";
import React from "react";
import { Route, Routes, HashRouter as Router} from "react-router-dom";
import LogIn from "./containers/Login";
import Polllist from "./containers/Polllist";
import PollDetail from "./containers/PollDetail";
import GlobalStyle from "./components/styles/globalStyles";
import ProtectedRoute from "./components/ProtectedRoute.js";
import { Navigate } from "react-router-dom";
import { ADMIN_TOKEN, CACHED_URL } from "./constants/localStorage";
import clientPath from "./constants/clientPath";

function App() {
  const { LOGIN, POLLLIST, POLLDETAIL, ROOT } = clientPath;
  const accessToken = sessionStorage.getItem(ADMIN_TOKEN);
  const cachedUrl = localStorage.getItem(CACHED_URL);
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path={ROOT} element={<Navigate to={LOGIN} />}></Route>
          <Route
            path={LOGIN}
            element={accessToken ? <Navigate to={cachedUrl} /> : <LogIn />}
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
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
