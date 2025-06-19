import React, { useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import { RoleName } from "../../types/auth";
import { ChevronDown } from "lucide-react";

const roleDisplayNames: Record<RoleName, string> = {
  ROLE_ADMIN: "Admin",
  ROLE_MANAGER: "Manager",
  ROLE_STAFF: "Staff",
  ROLE_USER: "Customer",
};

// Role colors and icons
const roleStyles: Record<RoleName, { color: string; icon: string }> = {
  ROLE_ADMIN: {
    color: "bg-gradient-to-r from-purple-500 to-purple-700",
    icon: "👑",
  },
  ROLE_MANAGER: {
    color: "bg-gradient-to-r from-blue-500 to-blue-700",
    icon: "🔧",
  },
  ROLE_STAFF: {
    color: "bg-gradient-to-r from-green-500 to-green-700",
    icon: "👤",
  },
  ROLE_USER: {
    color: "bg-gradient-to-r from-yellow-500 to-orange-500",
    icon: "🎬",
  },
};

const RoleSwitcher: React.FC = () => {
  const { activeRole, availableRoles, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Hide if user has only one role or no roles
  if (!activeRole || availableRoles.length <= 1) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="mb-1 text-sm text-gray-500">Chuyển đổi vai trò</div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <div className="flex items-center">
            <span className="mr-2 text-sm">{roleStyles[activeRole]?.icon}</span>
            <span>Role: {roleDisplayNames[activeRole] || "Unknown"}</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </button>

        {isOpen && (
          <div
            className="absolute left-0 right-0 z-10 mt-1 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="role-menu-button"
          >
            {availableRoles.map((role) => (
              <button
                key={role}
                onClick={() => {
                  switchRole(role);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center px-4 py-2 text-left text-sm ${
                  role === activeRole
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                role="menuitem"
              >
                <span className="mr-2">{roleStyles[role]?.icon}</span>
                {roleDisplayNames[role] || role}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSwitcher;
