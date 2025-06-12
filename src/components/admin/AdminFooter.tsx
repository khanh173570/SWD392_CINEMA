import React from "react";

const AdminFooter: React.FC = () => {
  return (
    <footer className="bg-white shadow-md p-4 text-center text-sm text-gray-600">
      <p>&copy; {new Date().getFullYear()} Cinema G7 Admin Panel</p>
    </footer>
  );
};

export default AdminFooter;
