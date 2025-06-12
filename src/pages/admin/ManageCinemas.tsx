import React, { useState } from "react";

const ManageCinemas: React.FC = () => {
  const [cinemas, setCinemas] = useState([
    {
      id: 1,
      name: "CGV Aeon Mall Hà Đông",
      address: "Tầng 3, TTTM Aeon Mall Hà Đông, Hà Nội",
      rooms: 8,
      status: "active",
    },
    {
      id: 2,
      name: "CGV Vincom Center Bà Triệu",
      address: "54A Nguyễn Chí Thanh, Q. Đống Đa, Hà Nội",
      rooms: 6,
      status: "active",
    },
    {
      id: 3,
      name: "Galaxy Cinema Nguyễn Du",
      address: "116 Nguyễn Du, Q.1, TP.HCM",
      rooms: 5,
      status: "maintenance",
    },
    {
      id: 4,
      name: "Lotte Cinema Landmark 81",
      address: "Tầng 2, Landmark 81, TP.HCM",
      rooms: 10,
      status: "active",
    },
    {
      id: 5,
      name: "BHD Star Cineplex Phạm Hùng",
      address: "Tầng 4, TTTM Satra Phạm Hùng, Q.8, TP.HCM",
      rooms: 7,
      status: "closed",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCinema, setNewCinema] = useState({
    name: "",
    address: "",
    rooms: 0,
    status: "active",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewCinema({
      ...newCinema,
      [name]: name === "rooms" ? parseInt(value) : value,
    });
  };

  const handleAddCinema = () => {
    setCinemas([
      ...cinemas,
      {
        id: cinemas.length + 1,
        ...newCinema,
      },
    ]);
    setShowAddModal(false);
    setNewCinema({
      name: "",
      address: "",
      rooms: 0,
      status: "active",
    });
  };

  const handleDeleteCinema = (id: number) => {
    setCinemas(cinemas.filter((cinema) => cinema.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý rạp phim</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Thêm rạp phim
        </button>
      </div>

      {/* Filter and search section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">Tất cả</option>
              <option value="active">Hoạt động</option>
              <option value="maintenance">Bảo trì</option>
              <option value="closed">Đóng cửa</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên rạp hoặc địa chỉ..."
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                ID
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Tên rạp
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Địa chỉ
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Số phòng
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Trạng thái
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cinemas.map((cinema) => (
              <tr key={cinema.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-500">{cinema.id}</td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  {cinema.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {cinema.address}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {cinema.rooms}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      cinema.status === "active"
                        ? "bg-green-100 text-green-800"
                        : cinema.status === "maintenance"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {cinema.status === "active"
                      ? "Hoạt động"
                      : cinema.status === "maintenance"
                      ? "Bảo trì"
                      : "Đóng cửa"}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteCinema(cinema.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-600">
          Hiển thị 1-{cinemas.length} trong tổng số {cinemas.length} rạp phim
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
            Trước
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-600 text-white">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
            Sau
          </button>
        </div>
      </div>

      {/* Add Cinema Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Thêm rạp phim mới
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên rạp phim
                  </label>
                  <input
                    name="name"
                    value={newCinema.name}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <input
                    name="address"
                    value={newCinema.address}
                    onChange={handleInputChange}
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số phòng
                  </label>
                  <input
                    name="rooms"
                    value={newCinema.rooms}
                    onChange={handleInputChange}
                    type="number"
                    min="1"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    value={newCinema.status}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="maintenance">Bảo trì</option>
                    <option value="closed">Đóng cửa</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 mr-2 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleAddCinema}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCinemas;
