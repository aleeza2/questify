// src/components/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { isLoggedIn } from "../utils/auth";

export default function RequireAuth({ children }) {
  const location = useLocation();

  if (!isLoggedIn()) {
    // Save the page they wanted in "state"
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}
