import React from 'react';
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
