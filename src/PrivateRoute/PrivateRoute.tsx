import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { auth } = useAuth();

  return auth?.username ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;