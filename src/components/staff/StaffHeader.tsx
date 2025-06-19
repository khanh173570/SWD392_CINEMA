import React, { useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { Link } from "react-router-dom";
import { Menu, User, LogOut, ChevronDown } from "lucide-react";
import RoleSwitcher from "../common/RoleSwitcher";

const StaffHeader: React.FC<{ toggleSidebar?: () => void }> = ({
  toggleSidebar,
}) => {
  const { user, logout } = useAuth();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {toggleSidebar && (
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-xl font-bold">Staff Portal</h1>
        </div>

        <div className="relative">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {user?.fullName}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>

          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md z-10 py-2">
              <div className="px-4 py-2">
                <RoleSwitcher />
              </div>
              <div className="border-t border-gray-200 my-1"></div>
              <Link
                to="/profile"
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <User className="w-4 h-4 mr-2" />
                Thông tin cá nhân
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default StaffHeader;
