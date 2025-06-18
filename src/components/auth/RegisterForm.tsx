import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import {
  Eye,
  EyeOff,
  UserPlus,
  User,
  Mail,
  Lock,
  CheckCircle,
} from "lucide-react";
import CinestarLogo from "../common/CinestarLogo";

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { register, loading, error, clearError } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError(null);
    }
  };
  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Mật khẩu xác nhận không khớp");
      return false;
    }

    if (formData.password.length < 6) {
      setValidationError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError("Email không hợp lệ");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setValidationError("Số điện thoại phải có 10 chữ số");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    clearError();

    if (!validateForm()) {
      return;
    }
    await register({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return 0;
    if (password.length < 6) return 1;
    if (password.length < 8) return 2;
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password)
    )
      return 4;
    return 3;
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthColors = [
    "",
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];
  const strengthTexts = ["", "Yếu", "Trung bình", "Khá", "Mạnh"];
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Grid background overlay */}{" "}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      {/* Subtle glow effects */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-600/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-600/20 to-transparent rounded-full filter blur-3xl"></div>
      {/* Register Form Container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Logo and Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <CinestarLogo className="h-12 w-12 text-white" />
              </div>
            </div>{" "}
            <div>
              <h1 className="text-3xl font-bold text-white">Tạo tài khoản</h1>
              <p className="text-white/80 mt-1">
                Tham gia cộng đồng CINESTAR ngay hôm nay
              </p>
            </div>
          </div>

          {/* Error Message */}
          {(error || validationError) && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-100 p-4 rounded-lg backdrop-blur-sm">
              {error || validationError}
            </div>
          )}

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {" "}
            {/* Full Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-white/90"
              >
                Họ và tên
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-white/60" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Nhập họ và tên"
                />
              </div>
            </div>
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/90"
              >
                Địa chỉ Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-white/60" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Nhập địa chỉ email"
                />
              </div>
            </div>
            {/* Phone Field */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-white/90"
              >
                Số điện thoại
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white/60"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Nhập số điện thoại"
                  pattern="[0-9]{10}"
                />
              </div>
            </div>
            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white/90"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/60" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="block w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Tạo mật khẩu"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          level <= passwordStrength
                            ? strengthColors[passwordStrength]
                            : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-white/70">
                    Mật khẩu phải có ít nhất 6 ký tự
                    {passwordStrength > 0 &&
                      ` - ${strengthTexts[passwordStrength]}`}
                  </p>
                </div>
              )}
            </div>
            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white/90"
              >
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-white/60" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="block w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="Xác nhận mật khẩu"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-white/60 hover:text-white transition-colors" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && formData.password && (
                <div className="flex items-center space-x-2">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-xs text-green-400">
                        Mật khẩu khớp
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-red-400"></div>
                      <span className="text-xs text-red-400">
                        Mật khẩu không khớp
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-white/80 group-hover:text-white transition-colors" />
              </span>
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Đang tạo tài khoản...
                </div>
              ) : (
                "Đăng ký"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-white/80">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="font-medium text-purple-300 hover:text-purple-200 transition-colors underline decoration-purple-300/50 hover:decoration-purple-200"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Brand */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            © 2024 CINESTAR. Hệ thống rạp chiếu phim hàng đầu Việt Nam.
          </p>
        </div>
      </div>{" "}
      {/* CSS for animations */}{" "}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .bg-grid-pattern {
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 30px 30px;
          }
        `,
        }}
      />
    </div>
  );
};

export default RegisterForm;
