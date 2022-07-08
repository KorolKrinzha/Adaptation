import { useState } from "react"
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = true;
  return auth ? children : <Navigate to="/sign" />;
}

export default ProtectedRoute;