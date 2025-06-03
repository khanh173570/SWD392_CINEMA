import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import CinestarLogo from "./CinestarLogo";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <CinestarLogo className="h-10 w-10 mr-2" />
              <h2 className="text-xl font-bold">CINESTAR</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Hệ thống rạp chiếu phim hiện đại với các phòng chiếu đạt chuẩn
              quốc tế, mang đến trải nghiệm điện ảnh tuyệt vời nhất.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-[#5D25A8] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  123 Nguyễn Du, Quận 1, TP. Hồ Chí Minh
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-[#5D25A8]" />
                <span className="text-gray-400">1900 1234</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#5D25A8]" />
                <span className="text-gray-400">contact@cinestar.vn</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Thông Tin</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tin tức & Ưu đãi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Câu hỏi thường gặp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Hỗ Trợ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Hướng dẫn đặt vé
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Quy định và chính sách
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Quyền lợi thành viên
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Tuyển dụng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Liên hệ quảng cáo
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} CINESTAR. Tất cả các quyền được bảo lưu.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Website được phát triển bởi Nhóm G7 - SWD392
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
