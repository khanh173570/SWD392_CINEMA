import React from 'react';
import { User, CreditCard, ShoppingCart, Star, Package, Mail } from 'lucide-react';

const CustomerDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Customer Dashboard</h1>
        <p className="text-gray-600">Welcome to your personal dashboard</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Account Status</p>
              <p className="text-xl font-bold mt-1 text-gray-800">Active</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <User className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Member since June 2023
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Orders</p>
              <p className="text-xl font-bold mt-1 text-gray-800">12</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <ShoppingCart className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <span className="text-blue-600 font-medium">3</span> pending delivery
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Wishlist</p>
              <p className="text-xl font-bold mt-1 text-gray-800">5 items</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600">
              <Star className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <span className="text-purple-600 font-medium">2</span> on sale now
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:scale-105">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Support</p>
              <p className="text-xl font-bold mt-1 text-gray-800">1 open</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
              <Mail className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <span className="text-green-600 font-medium">3</span> resolved this month
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Orders</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    #ORD-1234
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    July 15, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    3 items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $125.00
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Delivered
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    #ORD-1235
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    July 22, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1 item
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $35.50
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Shipped
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    #ORD-1236
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    August 5, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2 items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    $86.75
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Processing
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <button className="mt-6 text-blue-600 hover:text-blue-800 text-sm font-medium">
            View all orders →
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Account Information</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Edit
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-sm font-medium text-gray-800">John Doe</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-800">john.doe@example.com</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-sm font-medium text-gray-800">+1 (555) 123-4567</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="text-sm font-medium text-gray-800">
                123 Main Street, Apt 4B
                <br />
                New York, NY 10001
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-md font-medium text-gray-800 mb-4">Payment Methods</h3>
            
            <div className="space-y-3">
              <div className="flex items-center p-3 border rounded-lg">
                <div className="p-2 bg-blue-100 rounded-md text-blue-600 mr-3">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Visa ending in 4242</p>
                  <p className="text-xs text-gray-500">Expires 08/2025</p>
                </div>
                <div className="ml-auto">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Default
                  </span>
                </div>
              </div>
              
              <div className="flex items-center p-3 border rounded-lg">
                <div className="p-2 bg-purple-100 rounded-md text-purple-600 mr-3">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">Mastercard ending in 5678</p>
                  <p className="text-xs text-gray-500">Expires 10/2024</p>
                </div>
              </div>
            </div>
            
            <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-1" />
              Add payment method
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Recently Viewed Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="border rounded-lg overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-800">Wireless Headphones</h3>
              <p className="text-sm text-gray-600 mt-1">$79.99</p>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4" />
                </div>
                <span className="text-xs text-gray-500 ml-1">(42)</span>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-800">Smart Watch</h3>
              <p className="text-sm text-gray-600 mt-1">$129.99</p>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-xs text-gray-500 ml-1">(78)</span>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-800">Bluetooth Speaker</h3>
              <p className="text-sm text-gray-600 mt-1">$59.99</p>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4" />
                  <Star className="h-4 w-4" />
                </div>
                <span className="text-xs text-gray-500 ml-1">(23)</span>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden transition-transform hover:scale-105">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-800">Wireless Charger</h3>
              <p className="text-sm text-gray-600 mt-1">$39.99</p>
              <div className="flex items-center mt-2">
                <div className="flex text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-xs text-gray-500 ml-1">(107)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;