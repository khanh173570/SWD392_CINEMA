import React from "react";
import { Calendar, Clock, MapPin, Ticket, Eye } from "lucide-react";

interface BookingItem {
  id: string;
  movieTitle: string;
  cinema: string;
  date: string;
  time: string;
  seats: string[];
  totalAmount: number;
  status: "confirmed" | "cancelled" | "used";
  bookingCode: string;
}

const BookingHistory: React.FC = () => {
  // Mock data - replace with actual API call
  const bookings: BookingItem[] = [
    {
      id: "1",
      movieTitle: "Spider-Man: No Way Home",
      cinema: "CGV Vincom Đồng Khởi",
      date: "2024-12-15",
      time: "19:30",
      seats: ["A5", "A6"],
      totalAmount: 200000,
      status: "confirmed",
      bookingCode: "CGV123456",
    },
    {
      id: "2",
      movieTitle: "Avatar: The Way of Water",
      cinema: "CGV Aeon Mall Bình Tân",
      date: "2024-12-10",
      time: "21:00",
      seats: ["B3", "B4"],
      totalAmount: 180000,
      status: "used",
      bookingCode: "CGV789012",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "used":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "cancelled":
        return "Đã hủy";
      case "used":
        return "Đã sử dụng";
      default:
        return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Ticket className="text-purple-600" size={24} />
            Lịch sử đặt vé
          </h1>

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Ticket size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">
                Bạn chưa có vé nào được đặt
              </p>
              <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Đặt vé ngay
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {booking.movieTitle}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {getStatusText(booking.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-gray-400" />
                          <span>{booking.cinema}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-gray-400" />
                          <span>
                            {new Date(booking.date).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket size={16} className="text-gray-400" />
                          <span>Ghế: {booking.seats.join(", ")}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="text-sm text-gray-500">
                            Mã đặt vé: {booking.bookingCode}
                          </p>
                          <p className="font-semibold text-purple-600">
                            {formatCurrency(booking.totalAmount)}
                          </p>
                        </div>
                        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                          <Eye size={16} />
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
