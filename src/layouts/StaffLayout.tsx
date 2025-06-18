import React from "react";
import { Outlet } from "react-router-dom";

const StaffLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <h1 className="text-xl font-bold">Staff Portal</h1>
      </header>
      <div className="flex">
        <aside className="w-64 bg-white shadow-md min-h-screen p-4">
          <nav>
            <ul className="space-y-2">
              <li>
                <a
                  href="/staff/dashboard"
                  className="block p-2 hover:bg-gray-100 rounded"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/staff/schedule"
                  className="block p-2 hover:bg-gray-100 rounded"
                >
                  Schedule
                </a>
              </li>
              <li>
                <a
                  href="/staff/tickets"
                  className="block p-2 hover:bg-gray-100 rounded"
                >
                  Tickets
                </a>
              </li>
              <li>
                <a
                  href="/staff/customers"
                  className="block p-2 hover:bg-gray-100 rounded"
                >
                  Customers
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <footer className="bg-white border-t p-4 text-center text-gray-600">
        <p>&copy; 2024 CINESTAR Staff Portal</p>
      </footer>
    </div>
  );
};

export default StaffLayout;
