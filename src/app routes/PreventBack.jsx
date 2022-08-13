import React from "react";
import { Navigate } from "react-router-dom";

function PreventBack({ children }) {
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");

  if (isLoggedIn === 'true') {
    return <Navigate to="/" />;
  }
  return children;
}

export default PreventBack;
