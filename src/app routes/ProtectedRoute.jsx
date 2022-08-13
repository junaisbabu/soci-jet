import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "false") {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
