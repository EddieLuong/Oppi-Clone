import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const accessToken = sessionStorage.getItem("AdminAccessToken");
  const isLoggedIn = Boolean(accessToken);

  localStorage.setItem("CACHED_URL", location.pathname);
  const cacheUrl = localStorage.getItem("CACHED_URL");

  if (isLoggedIn && !cacheUrl) {
    return <Navigate to={location.pathname} />;
  }
  if (isLoggedIn) {
    return children;
  }

  return <Navigate to="/" />;
}
export default ProtectedRoute;
