import React from "react";

const StaffFooter: React.FC = () => {
  return (
    <footer className="bg-gray-50 shadow-md p-4 text-center text-sm text-gray-600">
      <p>&copy; {new Date().getFullYear()} Cinema G7 Staff Portal</p>
    </footer>
  );
};

export default StaffFooter;
