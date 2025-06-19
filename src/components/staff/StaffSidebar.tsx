import React from "react";
import { Link } from "react-router-dom";

interface StaffSidebarProps {
  isCollapsed: boolean;
}

const StaffSidebar: React.FC<StaffSidebarProps> = ({ isCollapsed }) => {
  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 bg-white shadow-md min-h-screen p-4`}
    >
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/staff/dashboard"
              className="p-2 hover:bg-gray-100 rounded flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {!isCollapsed && "Dashboard"}
            </Link>
          </li>
          <li>
            <Link
              to="/staff/schedule"
              className="p-2 hover:bg-gray-100 rounded flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {!isCollapsed && "Schedule"}
            </Link>
          </li>
          <li>
            <Link
              to="/staff/tickets"
              className="p-2 hover:bg-gray-100 rounded flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
              {!isCollapsed && "Tickets"}
            </Link>
          </li>
          <li>
            <Link
              to="/staff/customers"
              className="p-2 hover:bg-gray-100 rounded flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              {!isCollapsed && "Customers"}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default StaffSidebar;
