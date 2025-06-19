import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import StaffHeader from "../components/staff/StaffHeader";
import StaffFooter from "../components/staff/StaffFooter";
import StaffSidebar from "../components/staff/StaffSidebar";

const StaffLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <StaffHeader toggleSidebar={toggleSidebar} />
      <div className="flex">
        <StaffSidebar isCollapsed={isSidebarCollapsed} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <StaffFooter />
    </div>
  );
};

export default StaffLayout;
