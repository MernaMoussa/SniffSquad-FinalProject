import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuth, checkedAuth } = useContext(UserContext);
  console.log(isAuth);
  if (!checkedAuth) {
    return null;
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
