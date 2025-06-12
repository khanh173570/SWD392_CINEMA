import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { StaffHeader, StaffSidebar, StaffFooter } from "../components/staff";

const StaffLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <StaffSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <StaffHeader />

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <Outlet />
        </main>

        {/* Footer */}
        <StaffFooter />
      </div>
    </div>
  );
};

export default StaffLayout;
