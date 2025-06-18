import React from "react";
import { Link } from "react-router-dom";
import { Users, Shield, User, ArrowRight } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Welcome to Role-Based Access Control System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A complete authentication system with different access levels for
            customers, staff, and administrators.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
            >
              Login
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            User Roles and Access
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="text-blue-600 mb-4">
                <User className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer</h3>
              <p className="text-gray-600 mb-4">
                Regular users with basic access to the platform. Customers can
                view and manage their own content.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2">•</span> View personal dashboard
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> Manage profile settings
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> Access customer-specific
                  features
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="text-indigo-600 mb-4">
                <Users className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Staff</h3>
              <p className="text-gray-600 mb-4">
                Staff members have elevated permissions to manage resources and
                provide support to customers.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2">•</span> Access staff dashboard
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> View customer information
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> Manage support requests
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="text-purple-600 mb-4">
                <Shield className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Administrator</h3>
              <p className="text-gray-600 mb-4">
                Administrators have full control over the system and can manage
                all aspects of the platform.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2">•</span> Complete system management
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> User administration
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span> Configure system settings
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
