import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Menu,
  X,
  CalendarDays,
  Ticket,
  Users,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../contexts/useAuth";

interface StaffSidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const StaffSidebar: React.FC<StaffSidebarProps> = ({
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
      className={`bg-indigo-800 text-white ${
        isSidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between">
        {isSidebarOpen && <h1 className="text-xl font-bold">Staff Portal</h1>}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-indigo-700"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 mt-4">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/staff/dashboard"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
                } transition-colors`
              }
            >
              <LayoutDashboard size={20} />
              {isSidebarOpen && <span className="ml-3">Dashboard</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staff/schedule"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
                } transition-colors`
              }
            >
              <CalendarDays size={20} />
              {isSidebarOpen && <span className="ml-3">Lịch chiếu phim</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staff/tickets"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
                } transition-colors`
              }
            >
              <Ticket size={20} />
              {isSidebarOpen && <span className="ml-3">Quản lý vé</span>}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/staff/customers"
              className={({ isActive }) =>
                `flex items-center p-4 ${
                  isActive ? "bg-indigo-700" : "hover:bg-indigo-700"
                } transition-colors`
              }
            >
              <Users size={20} />
              {isSidebarOpen && <span className="ml-3">Khách hàng</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout button at the bottom */}
      <div className="mt-auto border-t border-indigo-700 pt-2 pb-4">
        <button
          onClick={handleLogout}
          className="flex items-center p-4 w-full text-left hover:bg-indigo-700 transition-colors text-red-300 hover:text-red-200"
        >
          <LogOut size={20} />
          {isSidebarOpen && <span className="ml-3">Đăng xuất</span>}
        </button>
      </div>
    </div>
  );
};

export default StaffSidebar;
