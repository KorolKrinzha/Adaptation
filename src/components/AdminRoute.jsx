import { useState } from "react"
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const auth = false;
  return auth ? children : <Navigate to="*" />;
}

export default ProtectedRoute;