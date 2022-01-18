import React from "react";
import { Route, Navigate } from "react-router-dom";
import { accessToken } from "./Utils";

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (accessToken) {
          return <Component {...props} />;
        } else {
          return (
            <Navigate replace to="/" />
            /* <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            /> */
          );
        }
      }}
    />
  );
}
ProtectedRoute.defaultProps = {
  location: {
    pathname: "/",
  },
};
export default ProtectedRoute;
