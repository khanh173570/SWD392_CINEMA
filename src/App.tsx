import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import Manageaccount from "./pages/admin/Manageaccount";
import ManageCinemas from "./pages/admin/ManageCinemas";
import ManageMovies from "./pages/admin/ManageMovies";
import ManageRevenue from "./pages/admin/ManageRevenue";
import ManageStatus from "./pages/admin/ManageStatus";
import StaffDashboard from "./pages/staff/Dashboard";
import CustomerDashboard from "./pages/customer/Dashboard";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import StaffLayout from "./layouts/StaffLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import StaffSchedule from "./pages/staff/Schedule";
import StaffTickets from "./pages/staff/Tickets";
import StaffCustomers from "./pages/staff/Customers";

function App() {
  const adminRole = import.meta.env.VITE_ROLE_ADMIN;
  const staffRole = import.meta.env.VITE_ROLE_STAFF;
  const customerRole = import.meta.env.VITE_ROLE_CUSTOMER;
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Public routes (khách, chưa đăng nhập) */}
            <Route element={<PublicRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            {/* Public routes (chỉ khách, đã đăng nhập sẽ redirect) */}
            <Route element={<PublicRoute restricted />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            {/* Customer, Staff, Admin đều vào được */}
            <Route
              element={
                <ProtectedRoute
                  allowedRoles={[customerRole, staffRole, adminRole]}
                />
              }
            >
              <Route
                path="/customer/dashboard"
                element={<CustomerDashboard />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Chỉ Admin */}
          <Route element={<ProtectedRoute allowedRoles={[adminRole]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/manageaccount" element={<Manageaccount />} />
              <Route path="/admin/manage-cinemas" element={<ManageCinemas />} />
              <Route path="/admin/manage-movies" element={<ManageMovies />} />
              <Route path="/admin/manage-revenue" element={<ManageRevenue />} />
              <Route path="/admin/manage-status" element={<ManageStatus />} />
            </Route>
          </Route>

          {/* Staff và Admin */}
          <Route
            element={<ProtectedRoute allowedRoles={[staffRole, adminRole]} />}
          >
            <Route element={<StaffLayout />}>
              <Route path="/staff/dashboard" element={<StaffDashboard />} />
              <Route path="/staff/schedule" element={<StaffSchedule />} />
              <Route path="/staff/tickets" element={<StaffTickets />} />
              <Route path="/staff/customers" element={<StaffCustomers />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
