import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

interface PublicRouteProps {
  restricted?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ restricted = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If route is restricted and user is logged in, redirect based on role
  if (restricted && user) {
    const adminRole = import.meta.env.VITE_ROLE_ADMIN;
    const staffRole = import.meta.env.VITE_ROLE_STAFF;
    const customerRole = import.meta.env.VITE_ROLE_CUSTOMER;

    if (user.roles === adminRole) {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.roles === staffRole) {
      return <Navigate to="/staff/dashboard" replace />;
    } else if (user.roles === customerRole) {
      return <Navigate to="/customer/dashboard" replace />;
    }
  }

  // If not restricted or user is not logged in, render the public route
  return <Outlet />;
};

export default PublicRoute;
