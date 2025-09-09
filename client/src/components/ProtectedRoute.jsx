// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isLoggedIn()) {
    // save where user wanted to go
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
