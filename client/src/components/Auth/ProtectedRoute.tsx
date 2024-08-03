import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  component: React.FC<any>;
  roles: string[];
  [key: string]: any; // To allow additional props
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, roles, ...rest }) => {
  const userRole = localStorage.getItem('role'); // Assuming role is stored in localStorage

  if (!userRole || !roles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
