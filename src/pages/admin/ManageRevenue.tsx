import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const ManageRevenue: React.FC = () => {
  const [dateRange, setDateRange] = useState("month");
  const [cinemaId, setCinemaId] = useState("all");

  // Mock data for demonstration
  const monthlyData = [
    { name: "Tháng 1", revenue: 40000000, tickets: 3200 },
    { name: "Tháng 2", revenue: 31000000, tickets: 2500 },
    { name: "Tháng 3", revenue: 45000000, tickets: 3600 },
    { name: "Tháng 4", revenue: 52000000, tickets: 4100 },
    { name: "Tháng 5", revenue: 48000000, tickets: 3800 },
    { name: "Tháng 6", revenue: 61000000, tickets: 4800 },
  ];

  const weeklyData = [
    { name: "Tuần 1", revenue: 12000000, tickets: 950 },
    { name: "Tuần 2", revenue: 15000000, tickets: 1200 },
    { name: "Tuần 3", revenue: 14000000, tickets: 1100 },
    { name: "Tuần 4", revenue: 20000000, tickets: 1550 },
  ];

  const movieRevenueData = [
    { name: "Avengers: Endgame", value: 25000000 },
    { name: "Parasite", value: 18000000 },
    { name: "Joker", value: 22000000 },
    { name: "Dune", value: 15000000 },
    { name: "The Shawshank Redemption", value: 10000000 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  // Select the appropriate data based on the date range
  const chartData = dateRange === "month" ? monthlyData : weeklyData;

  // Calculate total revenue and total tickets
  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);
  const totalTickets = chartData.reduce((sum, item) => sum + item.tickets, 0);
  const averageTicketPrice = totalRevenue / totalTickets;

  // Format as VND currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý doanh thu</h1>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${
              dateRange === "week"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
            onClick={() => setDateRange("week")}
          >
            Tuần
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              dateRange === "month"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            }`}
            onClick={() => setDateRange("month")}
          >
            Tháng
          </button>
        </div>
      </div>

      {/* Filter section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rạp chiếu phim
            </label>
            <select
              value={cinemaId}
              onChange={(e) => setCinemaId(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả</option>
              <option value="1">CGV Aeon Mall Hà Đông</option>
              <option value="2">CGV Vincom Center Bà Triệu</option>
              <option value="3">Galaxy Cinema Nguyễn Du</option>
              <option value="4">Lotte Cinema Landmark 81</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Từ ngày
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Đến ngày
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Tổng doanh thu
          </h3>
          <p className="text-3xl font-bold text-blue-600">
            {formatCurrency(totalRevenue)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {dateRange === "month" ? "6 tháng gần nhất" : "4 tuần gần nhất"}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Tổng vé bán ra
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {totalTickets.toLocaleString()} vé
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {dateRange === "month" ? "6 tháng gần nhất" : "4 tuần gần nhất"}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Giá vé trung bình
          </h3>
          <p className="text-3xl font-bold text-purple-600">
            {formatCurrency(averageTicketPrice)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {dateRange === "month" ? "6 tháng gần nhất" : "4 tuần gần nhất"}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Biểu đồ doanh thu
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value / 1000000}M`} />
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Legend />
                <Bar dataKey="revenue" name="Doanh thu" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Movie Revenue Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Phân bổ doanh thu theo phim
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={movieRevenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {movieRevenueData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ticket Sales Trend */}
        <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Xu hướng bán vé
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="tickets"
                  name="Số lượng vé"
                  stroke="#10b981"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue Data Table */}
      <div className="bg-white rounded-lg shadow-md mt-8">
        <h3 className="text-lg font-medium text-gray-700 p-6 border-b">
          Chi tiết doanh thu
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                  Thời gian
                </th>
                <th className="py-3 px-6 text-right text-sm font-semibold text-gray-700">
                  Doanh thu
                </th>
                <th className="py-3 px-6 text-right text-sm font-semibold text-gray-700">
                  Số lượng vé
                </th>
                <th className="py-3 px-6 text-right text-sm font-semibold text-gray-700">
                  Giá vé TB
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {chartData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-6 text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-900 text-right">
                    {formatCurrency(item.revenue)}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-900 text-right">
                    {item.tickets.toLocaleString()} vé
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-900 text-right">
                    {formatCurrency(item.revenue / item.tickets)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium">
                <td className="py-3 px-6 text-sm text-gray-900">Tổng cộng</td>
                <td className="py-3 px-6 text-sm text-gray-900 text-right">
                  {formatCurrency(totalRevenue)}
                </td>
                <td className="py-3 px-6 text-sm text-gray-900 text-right">
                  {totalTickets.toLocaleString()} vé
                </td>
                <td className="py-3 px-6 text-sm text-gray-900 text-right">
                  {formatCurrency(averageTicketPrice)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageRevenue;
