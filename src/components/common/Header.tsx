import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { LogOut, Search, Menu, X, MapPin, ShoppingBag } from "lucide-react";
import CinestarLogo from "./CinestarLogo";

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Effect to handle scroll events
  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <>
      {/* Spacer div to prevent content from hiding under the fixed header */}
      <div
        className={`${
          scrolled ? "h-[64px]" : "h-[120px]"
        } transition-all duration-300`}
      ></div>

      {/* Fixed header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full">
        {/* Main navigation bar with background color */}
        <div
          className={`bg-[#0f172a] shadow-md transition-all duration-300 ${
            scrolled ? "shadow-lg" : ""
          }`}
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link
                to="/"
                className="text-2xl font-bold flex items-center gap-2"
              >
                <CinestarLogo className="h-10 w-10" />
                <span className="hidden md:inline text-white">CINESTAR</span>
              </Link>

              {/* Booking buttons */}
              <div className="hidden md:flex gap-2">
                <Link
                  to="/booking"
                  className="bg-yellow-400 text-black px-4 py-2 rounded flex items-center gap-2 font-medium hover:bg-yellow-300 transition-colors"
                >
                  <ShoppingBag size={18} />
                  ĐẶT VÉ NGAY
                </Link>
                <Link
                  to="/pre-booking"
                  className="bg-transparent border border-white text-white px-4 py-2 rounded flex items-center gap-2 font-medium hover:bg-white hover:text-[#0f172a] transition-colors"
                >
                  <ShoppingBag size={18} />
                  ĐẶT GẬP NƯỚC
                </Link>
              </div>

              {/* Search bar */}
              <div className="hidden md:flex flex-1 max-w-md mx-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Tìm phim, rạp"
                    className="w-full py-2 px-4 pr-10 rounded-full bg-white text-black focus:outline-none"
                  />
                  <button className="absolute right-0 top-0 h-full px-3 flex items-center text-gray-500">
                    <Search size={18} />
                  </button>
                </div>
              </div>

              {/* User account */}
              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">
                      {user.userName}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:text-gray-300 transition-colors"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="font-medium text-white hover:text-gray-300 transition-colors flex items-center gap-2"
                  >
                    Đăng nhập
                  </Link>
                )}
                <div className="flex items-center gap-1 text-white">
                  <img
                    src="https://flagcdn.com/w20/vn.png"
                    alt="Vietnam"
                    className="h-5 rounded"
                  />
                  <span>VN</span>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden text-white focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex mt-3 gap-6 justify-center">
              <Link
                to="/location"
                className="flex items-center gap-1 text-white hover:text-gray-300 transition-colors"
              >
                <MapPin size={16} />
                Chọn rạp
              </Link>
              <Link
                to="/movies"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Lịch chiếu
              </Link>
              <Link
                to="/promotions"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Khuyến mãi
              </Link>
              <Link
                to="/services"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Thuê sự kiện
              </Link>
              <Link
                to="/price"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Tất cả các giải trí
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-gray-300 transition-colors"
              >
                Giới thiệu
              </Link>
            </nav>

            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
                <div className="flex flex-col gap-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Tìm phim, rạp"
                      className="w-full py-2 px-4 pr-10 rounded-full bg-white text-gray-800 focus:outline-none"
                    />
                    <button className="absolute right-0 top-0 h-full px-3 flex items-center text-gray-500">
                      <Search size={18} />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to="/booking"
                      className="bg-yellow-400 text-black px-4 py-2 rounded flex-1 text-center text-sm font-medium hover:bg-yellow-300 transition-colors"
                    >
                      ĐẶT VÉ NGAY
                    </Link>
                    <Link
                      to="/pre-booking"
                      className="bg-transparent border border-white text-white px-2 py-2 rounded flex-1 text-center text-sm font-medium hover:bg-white hover:text-[#0f172a] transition-colors"
                    >
                      ĐẶT BẮP NƯỚC
                    </Link>
                  </div>

                  <Link
                    to="/location"
                    className="flex items-center gap-1 text-white p-2"
                  >
                    <MapPin size={16} />
                    Chọn rạp
                  </Link>
                  <Link to="/movies" className="text-white p-2">
                    Lịch chiếu
                  </Link>
                  <Link to="/promotions" className="text-white p-2">
                    Khuyến mãi
                  </Link>
                  <Link to="/services" className="text-white p-2">
                    Thuê sự kiện
                  </Link>
                  <Link to="/price" className="text-white p-2">
                    Tất cả các giải trí
                  </Link>
                  <Link to="/about" className="text-white p-2">
                    Giới thiệu
                  </Link>

                  <div className="border-t border-gray-700 pt-4">
                    {user ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-300">Welcome,</span>
                          <span className="font-semibold">{user.userName}</span>
                          <span className="ml-auto px-2 py-1 text-xs bg-[#5D25A8] rounded-full">
                            {user.roleName}
                          </span>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
                        >
                          <LogOut size={16} />
                          Đăng xuất
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Link
                          to="/login"
                          className="text-white hover:text-gray-300 transition-colors p-2"
                        >
                          Đăng nhập
                        </Link>
                        <Link
                          to="/register"
                          className="bg-white text-[#0f172a] px-4 py-2 rounded-md hover:bg-gray-200 transition-colors w-fit"
                        >
                          Đăng ký
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-4">
                      <span className="text-gray-300">Ngôn ngữ:</span>
                      <div className="flex items-center gap-1 text-white">
                        <img
                          src="https://flagcdn.com/w20/vn.png"
                          alt="Vietnam"
                          className="h-5 rounded"
                        />
                        <span>VN</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
