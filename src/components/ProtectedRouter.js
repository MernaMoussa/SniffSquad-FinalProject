import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const ProtectedRoute = ({ children }) => {
  /*const { isAuth, checkedAuth } = useContext(UserContext);
  console.log(isAuth);
  if (!checkedAuth) {
    return null;
  }*/
  const accessToken = document.cookie.includes("access_token");

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
