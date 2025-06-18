import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const ManagerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <main className="bg-white rounded-lg shadow-md p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ManagerLayout;
