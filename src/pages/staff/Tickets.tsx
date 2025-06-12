import React, { useState } from "react";

interface Ticket {
  id: string;
  movieTitle: string;
  customerName: string;
  showtime: string;
  theater: string;
  seats: string[];
  status: "paid" | "pending" | "cancelled";
  price: number;
  date: string;
}

const StaffTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "T001",
      movieTitle: "Spider-Man: No Way Home",
      customerName: "Nguyễn Văn A",
      showtime: "10:00",
      theater: "Phòng chiếu 1",
      seats: ["A1", "A2"],
      status: "paid",
      price: 180000,
      date: "2025-06-13",
    },
    {
      id: "T002",
      movieTitle: "The Batman",
      customerName: "Trần Thị B",
      showtime: "11:30",
      theater: "Phòng chiếu 2",
      seats: ["B3", "B4", "B5"],
      status: "pending",
      price: 270000,
      date: "2025-06-13",
    },
    {
      id: "T003",
      movieTitle: "Doctor Strange",
      customerName: "Lê Văn C",
      showtime: "13:00",
      theater: "Phòng chiếu 3",
      seats: ["C6"],
      status: "paid",
      price: 90000,
      date: "2025-06-13",
    },
    {
      id: "T004",
      movieTitle: "Black Widow",
      customerName: "Phạm Thị D",
      showtime: "15:00",
      theater: "Phòng chiếu 1",
      seats: ["D7", "D8"],
      status: "cancelled",
      price: 180000,
      date: "2025-06-13",
    },
    {
      id: "T005",
      movieTitle: "Dune",
      customerName: "Hoàng Văn E",
      showtime: "16:30",
      theater: "Phòng chiếu 2",
      seats: ["E9", "E10", "E11", "E12"],
      status: "paid",
      price: 360000,
      date: "2025-06-13",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.movieTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || ticket.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "pending":
        return "Chờ thanh toán";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý vé</h1>
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
                  placeholder="Tìm kiếm mã vé, khách hàng, phim..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="status" className="sr-only">
                Trạng thái
              </label>
              <select
                id="status"
                value={filterStatus}
                onChange={handleStatusChange}
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="paid">Đã thanh toán</option>
                <option value="pending">Chờ thanh toán</option>
                <option value="cancelled">Đã hủy</option>
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
                  Mã vé
                </th>
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
                  Thông tin vé
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ghế
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Giá (VNĐ)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Trạng thái
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
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {ticket.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {ticket.customerName}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {ticket.movieTitle}
                    </div>
                    <div className="text-sm text-gray-500">
                      {ticket.theater} - {ticket.date} {ticket.showtime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {ticket.seats.join(", ")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {ticket.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        ticket.status
                      )}`}
                    >
                      {getStatusText(ticket.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                      Chi tiết
                    </button>
                    {ticket.status === "pending" && (
                      <>
                        <button className="text-green-600 hover:text-green-900 mr-3">
                          Xác nhận
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          Hủy
                        </button>
                      </>
                    )}
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

export default StaffTickets;
