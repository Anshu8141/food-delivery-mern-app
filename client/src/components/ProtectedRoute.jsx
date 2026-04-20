import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import '../styles/ProtectedRoute.css';

const ProtectedRoute = ({ user, children, requiredRole = null }) => {
  const location = useLocation();

  // 🔐 Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 🔒 Admin route protection
  if (requiredRole === "admin") {
    if (user.role !== "admin" && user.role !== "superadmin") {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;