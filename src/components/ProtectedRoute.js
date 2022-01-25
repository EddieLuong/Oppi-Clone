import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CACHED_URL, ADMIN_TOKEN } from "../constants/localStorage";
import clientPath from "../constants/clientPath";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const accessToken = sessionStorage.getItem(ADMIN_TOKEN);
  const isLoggedIn = Boolean(accessToken);

  if (!isLoggedIn) {
    localStorage.setItem(CACHED_URL, location.pathname);
  }
  const cacheUrl = localStorage.getItem(CACHED_URL);

  if (isLoggedIn && !cacheUrl) {
    return children;
  }
  if (isLoggedIn && cacheUrl) {
    localStorage.removeItem(CACHED_URL);
    return <Navigate to={cacheUrl} />;
  }

  return <Navigate to={clientPath.LOGIN} />;
}
export default ProtectedRoute;
