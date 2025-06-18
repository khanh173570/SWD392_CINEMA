import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { AdminHeader, AdminSidebar, AdminFooter } from "../components/admin";

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        <main
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
