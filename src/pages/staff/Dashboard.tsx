import React from 'react';
import { User, Clock, CheckCircle, XCircle, BarChart } from 'lucide-react';

const StaffDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Staff Dashboard</h1>
        <p className="text-gray-600">Manage customer interactions and support</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold mt-1 text-gray-800">256</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
              <User className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <span className="text-green-600 font-medium">↑ 8%</span> from last month
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Requests</p>
              <p className="text-2xl font-bold mt-1 text-gray-800">15</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
              <Clock className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <span className="text-red-600 font-medium">↑ 12%</span> from last week
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Resolved Issues</p>
              <p className="text-2xl font-bold mt-1 text-gray-800">142</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg text-green-600">
              <CheckCircle className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <span className="text-green-600 font-medium">↑ 16%</span> from last month
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Escalated Issues</p>
              <p className="text-2xl font-bold mt-1 text-gray-800">7</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg text-red-600">
              <XCircle className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <span className="text-red-600 font-medium">↓ 3%</span> from last month
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Customer Support Requests</h2>
            <div className="flex items-center space-x-2">
              <select className="text-sm border rounded-md px-2 py-1">
                <option>All Requests</option>
                <option>Open</option>
                <option>Pending</option>
                <option>Resolved</option>
              </select>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm">Filter</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
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
                        <div className="text-sm font-medium text-gray-900">Jane Doe</div>
                        <div className="text-sm text-gray-500">jane.doe@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Login issue</div>
                    <div className="text-sm text-gray-500">Cannot access account</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Today, 10:30 AM
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Resolve</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        MS
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Michael Smith</div>
                        <div className="text-sm text-gray-500">michael.s@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Billing question</div>
                    <div className="text-sm text-gray-500">Charge discrepancy</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Resolved
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Yesterday, 2:15 PM
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        AJ
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Alice Johnson</div>
                        <div className="text-sm text-gray-500">alice.j@example.com</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Feature request</div>
                    <div className="text-sm text-gray-500">Dashboard enhancements</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      In Progress
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Jul 15, 9:30 AM
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Update</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing 3 of 15 requests
            </div>
            <div className="flex space-x-1">
              <button className="px-3 py-1 border rounded-md text-sm">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">1</button>
              <button className="px-3 py-1 border rounded-md text-sm">2</button>
              <button className="px-3 py-1 border rounded-md text-sm">3</button>
              <button className="px-3 py-1 border rounded-md text-sm">Next</button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Activity Overview</h2>
            <div className="p-2 bg-blue-100 rounded-md text-blue-600">
              <BarChart className="h-5 w-5" />
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Response Time</span>
                <span className="text-sm font-medium text-green-600">30 min avg.</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">15% faster than last month</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Resolution Rate</span>
                <span className="text-sm font-medium text-blue-600">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">3% increase from last month</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Customer Satisfaction</span>
                <span className="text-sm font-medium text-yellow-600">4.7/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '94%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">0.2 points higher than target</p>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Escalation Rate</span>
                <span className="text-sm font-medium text-red-600">7%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '7%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">1% lower than last month</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-medium text-gray-700 mb-3">Your Recent Activities</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Resolved login issue for Jane Doe</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Resolved billing question from Michael Smith</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-gray-800">Started working on feature request</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;