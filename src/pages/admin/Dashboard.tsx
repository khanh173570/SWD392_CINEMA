import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  Settings,
  Activity,
  Bell,
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboards</h1>
        <p className="text-gray-600">Welcome to the administration panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-80">Total Users</p>
              <p className="text-3xl font-bold mt-1">1,254</p>
            </div>
            <div className="bg-blue-400 bg-opacity-40 p-3 rounded-lg">
              <Users className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-300">↑ 12%</span> from last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-80">Active Users</p>
              <p className="text-3xl font-bold mt-1">876</p>
            </div>
            <div className="bg-green-400 bg-opacity-40 p-3 rounded-lg">
              <UserCheck className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-300">↑ 8%</span> from last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-80">
                New Registrations
              </p>
              <p className="text-3xl font-bold mt-1">45</p>
            </div>
            <div className="bg-amber-400 bg-opacity-40 p-3 rounded-lg">
              <Activity className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-300">↑ 15%</span> from last week
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-80">Inactive Users</p>
              <p className="text-3xl font-bold mt-1">78</p>
            </div>
            <div className="bg-red-400 bg-opacity-40 p-3 rounded-lg">
              <UserX className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-red-300">↓ 3%</span> from last month
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent User Activity
            </h2>
            <button className="text-blue-600 hover:text-blue-800">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        JD
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          John Doe
                        </div>
                        <div className="text-sm text-gray-500">
                          john.doe@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Staff
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Updated customer profile
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    5 minutes ago
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        AS
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Alice Smith
                        </div>
                        <div className="text-sm text-gray-500">
                          alice.smith@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Customer
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Logged in
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    15 minutes ago
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        RJ
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Robert Johnson
                        </div>
                        <div className="text-sm text-gray-500">
                          robert.j@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Admin
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Changed system settings
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1 hour ago
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Notifications
            </h2>
            <button className="text-blue-600 hover:text-blue-800">
              Mark All Read
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <div className="bg-blue-500 p-2 rounded-md text-white mr-3">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    System Update
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    New version deployed successfully.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="flex items-start">
                <div className="bg-yellow-500 p-2 rounded-md text-white mr-3">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    New Registration
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    10 new users registered today.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-start">
                <div className="bg-red-500 p-2 rounded-md text-white mr-3">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Security Alert
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Multiple failed login attempts detected.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">6 hours ago</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-start">
                <div className="bg-green-500 p-2 rounded-md text-white mr-3">
                  <Settings className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Settings Updated
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Email notification settings were updated.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors duration-200">
            View All Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
