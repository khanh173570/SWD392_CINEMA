import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Users,
  LayoutDashboard,
  Menu,
  X,
  Film,
  Building2,
  DollarSign,
  Activity,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../contexts/useAuth";

interface AdminSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div
      className={`bg-blue-900 text-white ${
        isSidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between">
        {isSidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-blue-800"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 mt-4">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-blue-800" : "hover:bg-blue-800"
                } transition-colors`
              }
            >
              <LayoutDashboard size={20} />
              {isSidebarOpen && <span className="ml-3">Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/manageaccount"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-blue-800" : "hover:bg-blue-800"
                } transition-colors`
              }
            >
              <Users size={20} />
              {isSidebarOpen && <span className="ml-3">Quản lý tài khoản</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/manage-cinemas"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-blue-800" : "hover:bg-blue-800"
                } transition-colors`
              }
            >
              <Building2 size={20} />
              {isSidebarOpen && <span className="ml-3">Quản lý rạp phim</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/manage-movies"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-blue-800" : "hover:bg-blue-800"
                } transition-colors`
              }
            >
              <Film size={20} />
              {isSidebarOpen && <span className="ml-3">Quản lý phim</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/manage-revenue"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-blue-800" : "hover:bg-blue-800"
                } transition-colors`
              }
            >
              <DollarSign size={20} />
              {isSidebarOpen && <span className="ml-3">Quản lý doanh thu</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/manage-status"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-blue-800" : "hover:bg-blue-800"
                } transition-colors`
              }
            >
              <Activity size={20} />
              {isSidebarOpen && (
                <span className="ml-3">Quản lý trạng thái</span>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout button at the bottom */}
      <div className="mt-auto border-t border-blue-800 pt-2 pb-4">
        <button
          onClick={handleLogout}
          className="flex items-center p-4 w-full text-left hover:bg-blue-800 transition-colors text-red-300 hover:text-red-200"
        >
          <LogOut size={20} />
          {isSidebarOpen && <span className="ml-3">Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
