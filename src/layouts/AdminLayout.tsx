import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminHeader, AdminSidebar, AdminFooter } from "../components/admin";

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AdminHeader />

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <Outlet />
        </main>

        {/* Footer */}
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
