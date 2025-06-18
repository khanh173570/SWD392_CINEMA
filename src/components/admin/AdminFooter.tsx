import React from "react";

const AdminFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4 mt-auto">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          © 2024 CINESTAR Admin. All rights reserved.
        </div>
        <div className="text-sm text-gray-500">Version 1.0.0</div>
      </div>
    </footer>
  );
};

export default AdminFooter;
