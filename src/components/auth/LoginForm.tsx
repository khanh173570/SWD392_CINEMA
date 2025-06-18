import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { LogIn, Eye, EyeOff, Mail, Lock, Stars } from "lucide-react";
import CinestarLogo from "../common/CinestarLogo";

const LoginForm: React.FC = () => {
  const { login, error, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {/* Grid background overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      {/* Subtle glow effects */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-600/30 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-blue-600/20 to-transparent rounded-full filter blur-3xl"></div>
      {/* Login Form Container */}
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
              <h1 className="text-3xl font-bold text-white">
                Chào mừng trở lại
              </h1>
              <p className="text-white/80 mt-1">
                Đăng nhập vào tài khoản CINESTAR của bạn
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-100 p-4 rounded-lg backdrop-blur-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              {" "}
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white/90"
              >
                Email
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
                  placeholder="Nhập email"
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
                  placeholder="Nhập mật khẩu"
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
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-white/80 group-hover:text-white transition-colors" />
              </span>
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Đang đăng nhập...
                </div>
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-white/80">
              Chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="font-medium text-purple-300 hover:text-purple-200 transition-colors underline decoration-purple-300/50 hover:decoration-purple-200"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Demo Accounts */}
        </div>
        {/* Footer Brand */}{" "}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            © 2024 CINESTAR. Hệ thống rạp chiếu phim hàng đầu Việt Nam.
          </p>
        </div>
      </div>{" "}
      {/* Custom CSS for animations */}{" "}
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

export default LoginForm;
