import React, { useState } from "react";

interface Schedule {
  id: number;
  movieTitle: string;
  theater: string;
  startTime: string;
  endTime: string;
  date: string;
}

const StaffSchedule: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: 1,
      movieTitle: "Spider-Man: No Way Home",
      theater: "Phòng chiếu 1",
      startTime: "10:00",
      endTime: "12:30",
      date: "2025-06-13",
    },
    {
      id: 2,
      movieTitle: "The Batman",
      theater: "Phòng chiếu 2",
      startTime: "11:30",
      endTime: "14:00",
      date: "2025-06-13",
    },
    {
      id: 3,
      movieTitle: "Doctor Strange",
      theater: "Phòng chiếu 3",
      startTime: "13:00",
      endTime: "15:15",
      date: "2025-06-13",
    },
    {
      id: 4,
      movieTitle: "Black Widow",
      theater: "Phòng chiếu 1",
      startTime: "15:00",
      endTime: "17:15",
      date: "2025-06-13",
    },
    {
      id: 5,
      movieTitle: "Dune",
      theater: "Phòng chiếu 2",
      startTime: "16:30",
      endTime: "19:30",
      date: "2025-06-13",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState<string>("2025-06-13");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Lịch chiếu phim</h1>
        <div className="flex items-center space-x-4">
          <label className="text-gray-600">Chọn ngày:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phòng chiếu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian bắt đầu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian kết thúc
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {schedule.movieTitle}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {schedule.theater}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {schedule.startTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {schedule.endTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                      Sửa
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Schedule Button */}
      <div className="mt-6 flex justify-end">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center">
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
          Thêm lịch chiếu
        </button>
      </div>
    </div>
  );
};

export default StaffSchedule;
