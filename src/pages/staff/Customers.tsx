import React, { useState } from "react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipLevel: "standard" | "silver" | "gold" | "platinum";
  points: number;
  registrationDate: string;
}

const StaffCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "C001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0901234567",
      membershipLevel: "gold",
      points: 500,
      registrationDate: "2023-05-10",
    },
    {
      id: "C002",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0912345678",
      membershipLevel: "silver",
      points: 250,
      registrationDate: "2024-01-15",
    },
    {
      id: "C003",
      name: "Lê Văn C",
      email: "levanc@example.com",
      phone: "0923456789",
      membershipLevel: "standard",
      points: 100,
      registrationDate: "2025-03-22",
    },
    {
      id: "C004",
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      phone: "0934567890",
      membershipLevel: "platinum",
      points: 1200,
      registrationDate: "2022-11-05",
    },
    {
      id: "C005",
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      phone: "0945678901",
      membershipLevel: "gold",
      points: 780,
      registrationDate: "2023-07-18",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembership, setSelectedMembership] = useState("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    const matchesMembership =
      selectedMembership === "all" ||
      customer.membershipLevel === selectedMembership;

    return matchesSearch && matchesMembership;
  });

  const getMembershipBadgeClass = (level: string) => {
    switch (level) {
      case "standard":
        return "bg-gray-100 text-gray-800";
      case "silver":
        return "bg-gray-200 text-gray-800";
      case "gold":
        return "bg-yellow-100 text-yellow-800";
      case "platinum":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getMembershipText = (level: string) => {
    switch (level) {
      case "standard":
        return "Tiêu chuẩn";
      case "silver":
        return "Bạc";
      case "gold":
        return "Vàng";
      case "platinum":
        return "Bạch kim";
      default:
        return level;
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMembershipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMembership(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý khách hàng</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="p-4 border-b">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-grow">
              <label htmlFor="search" className="sr-only">
                Tìm kiếm
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  id="search"
                  type="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="membership" className="sr-only">
                Hạng thành viên
              </label>
              <select
                id="membership"
                value={selectedMembership}
                onChange={handleMembershipChange}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="all">Tất cả hạng thành viên</option>
                <option value="standard">Tiêu chuẩn</option>
                <option value="silver">Bạc</option>
                <option value="gold">Vàng</option>
                <option value="platinum">Bạch kim</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Khách hàng
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Liên hệ
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thành viên
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Điểm tích lũy
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày đăng ký
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 font-medium text-sm">
                          {customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {customer.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {customer.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {customer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMembershipBadgeClass(
                        customer.membershipLevel
                      )}`}
                    >
                      {getMembershipText(customer.membershipLevel)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.points} điểm
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.registrationDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Lịch sử giao dịch
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffCustomers;
