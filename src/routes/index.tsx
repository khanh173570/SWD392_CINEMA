import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminDashboard from "../pages/admin/Dashboard";
import StaffDashboard from "../pages/staff/Dashboard";
import CustomerDashboard from "../pages/customer/Dashboard";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes: React.FC = () => {
  // Get roles from environment variables
  const adminRole = import.meta.env.VITE_ROLE_ADMIN;
  const staffRole = import.meta.env.VITE_ROLE_STAFF;
  const customerRole = import.meta.env.VITE_ROLE_CUSTOMER;

  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
        </Route>

        {/* Public Routes (Restricted - redirect if logged in) */}
        <Route element={<PublicRoute restricted />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={[adminRole]} />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Staff Routes */}
        <Route
          element={<ProtectedRoute allowedRoles={[staffRole, adminRole]} />}
        >
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
        </Route>

        {/* Customer Routes */}
        <Route
          element={
            <ProtectedRoute
              allowedRoles={[customerRole, staffRole, adminRole]}
            />
          }
        >
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
