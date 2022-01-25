import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const accessToken = sessionStorage.getItem("AdminAccessToken");
  const isLoggedIn = Boolean(accessToken);

  if (!isLoggedIn) {
    // const { location } = rest;
    localStorage.setItem("CACHED_URL", location.pathname);
  }
  // localStorage.setItem("CACHED_URL", location.pathname);
  const cacheUrl = localStorage.getItem("CACHED_URL");

  if (isLoggedIn && !cacheUrl) {
    // return <Navigate to={location.pathname} />;
    return children;
  }
  if (isLoggedIn && cacheUrl) {
    localStorage.removeItem("CACHED_URL");
    // return children;
    return <Navigate to={cacheUrl} />;
  }

  return <Navigate to="/" />;
}
export default ProtectedRoute;
