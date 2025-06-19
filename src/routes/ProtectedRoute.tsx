import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user, loading, activeRole } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Check if the user is authenticated and has the active role in the allowed roles
  if (!user || !activeRole || !allowedRoles.includes(activeRole)) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated and has the required role, render the protected content
  return <Outlet />;
};

export default ProtectedRoute;
