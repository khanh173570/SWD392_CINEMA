import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit2,
  Save,
  X,
  Camera,
} from "lucide-react";
import { useAuth } from "../../contexts/useAuth";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName || "",
    email: "",
    phone: "",
    dateOfBirth: "",
    fullName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the user profile
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      userName: user?.userName || "",
      email: "",
      phone: "",
      dateOfBirth: "",
      fullName: "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <User size={40} className="text-white" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                    <Camera size={16} className="text-gray-600" />
                  </button>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {formData.fullName || user?.userName || "Người dùng"}
                  </h1>
                  <p className="text-white/80">{user?.roleName}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors flex items-center gap-2"
              >
                <Edit2 size={16} />
                {isEditing ? "Hủy" : "Chỉnh sửa"}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Thông tin cá nhân
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên đăng nhập
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên
                    </label>
                    <div className="relative">
                      <User
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Nhập họ và tên"
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Nhập email"
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Số điện thoại
                    </label>
                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        placeholder="Nhập số điện thoại"
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ngày sinh
                    </label>
                    <div className="relative">
                      <Calendar
                        size={18}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Save size={16} />
                      Lưu thay đổi
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X size={16} />
                      Hủy
                    </button>
                  </div>
                )}
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Thống kê
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white">
                    <h3 className="text-sm font-medium text-white/80">
                      Tổng số vé đã đặt
                    </h3>
                    <p className="text-2xl font-bold">12</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-lg text-white">
                    <h3 className="text-sm font-medium text-white/80">
                      Tổng chi tiêu
                    </h3>
                    <p className="text-2xl font-bold">2,400,000₫</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-lg text-white">
                    <h3 className="text-sm font-medium text-white/80">
                      Điểm tích lũy
                    </h3>
                    <p className="text-2xl font-bold">850</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-2">
                    Phim yêu thích gần đây
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Spider-Man: No Way Home</li>
                    <li>• Avatar: The Way of Water</li>
                    <li>• Top Gun: Maverick</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
