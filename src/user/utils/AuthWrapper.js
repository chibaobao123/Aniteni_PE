import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthWrapper({ isSignedIn, children }) {
  return isSignedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
