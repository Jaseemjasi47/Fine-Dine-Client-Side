import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, isAdmin, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAdmin ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
