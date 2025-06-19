import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import Manageaccount from "./pages/admin/Manageaccount";
import StaffDashboard from "./pages/staff/Dashboard";
import CustomerDashboard from "./pages/customer/Dashboard";
import Profile from "./pages/customer/Profile";
import BookingHistory from "./pages/customer/BookingHistory";
import ManagerDashboard from "./pages/manager/Dashboard";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import StaffLayout from "./layouts/StaffLayout";
import UserLayout from "./layouts/UserLayout";
import ManagerLayout from "./layouts/ManagerLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ManageCinemas from "./pages/admin/ManageCinemas";
import ManageMovies from "./pages/admin/ManageMovies";
import ManageRevenue from "./pages/admin/ManageRevenue";
import ManageStatus from "./pages/admin/ManageStatus";
import StaffSchedule from "./pages/staff/Schedule";
import StaffTickets from "./pages/staff/Tickets";
import StaffCustomers from "./pages/staff/Customers";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <NotificationProvider>
          <AuthProvider>
            {" "}
            <Routes>
              {/* Auth routes (không có layout) */}
              <Route element={<PublicRoute restricted />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route element={<MainLayout />}>
                {/* Public routes (khách, chưa đăng nhập) */}
                <Route element={<PublicRoute />}>
                  <Route path="/" element={<Home />} />
                </Route>
                <Route path="*" element={<NotFound />} />{" "}
              </Route>{" "}
              {/* User/Customer routes (ROLE_USER) */}
              <Route element={<ProtectedRoute allowedRoles={["ROLE_USER"]} />}>
                <Route element={<UserLayout />}>
                  <Route
                    path="/customer/dashboard"
                    element={<CustomerDashboard />}
                  />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/booking-history" element={<BookingHistory />} />
                </Route>
              </Route>
              {/* Staff routes (ROLE_STAFF) */}
              <Route element={<ProtectedRoute allowedRoles={["ROLE_STAFF"]} />}>
                <Route element={<StaffLayout />}>
                  <Route path="/staff/dashboard" element={<StaffDashboard />} />
                  <Route path="/staff/schedule" element={<StaffSchedule />} />
                  <Route path="/staff/tickets" element={<StaffTickets />} />
                  <Route path="/staff/customers" element={<StaffCustomers />} />
                </Route>
              </Route>
              {/* Admin routes (ROLE_ADMIN) */}
              <Route element={<ProtectedRoute allowedRoles={["ROLE_ADMIN"]} />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route
                    path="/admin/manageaccount"
                    element={<Manageaccount />}
                  />
                  <Route
                    path="/admin/manage-cinemas"
                    element={<ManageCinemas />}
                  />
                  <Route
                    path="/admin/manage-movies"
                    element={<ManageMovies />}
                  />
                  <Route
                    path="/admin/manage-revenue"
                    element={<ManageRevenue />}
                  />
                  <Route
                    path="/admin/manage-status"
                    element={<ManageStatus />}
                  />
                </Route>
              </Route>
              {/* Manager routes (ROLE_MANAGER) */}
              <Route
                element={<ProtectedRoute allowedRoles={["ROLE_MANAGER"]} />}
              >
                <Route element={<ManagerLayout />}>
                  <Route
                    path="/manager/dashboard"
                    element={<ManagerDashboard />}
                  />
                </Route>
              </Route>{" "}
            </Routes>
          </AuthProvider>
        </NotificationProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
