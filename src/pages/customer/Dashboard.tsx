import React, { useEffect, useState } from "react";
import { Movie } from "../../types/customer";
import { getShowingMovies, getComingMovies } from "../../services/movie";
import { FeaturedMovie, MovieCard } from "../../components/customer";
import { Film, Calendar, Loader2 } from "lucide-react";

const Dashboard = () => {
  const [showingMovies, setShowingMovies] = useState<Movie[]>([]);
  const [comingMovies, setComingMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Quick booking states
  const [selectedCinema, setSelectedCinema] = useState<string>("");
  const [selectedMovie, setSelectedMovie] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedShowtime, setSelectedShowtime] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        // Fetch all movie categories in parallel
        const [showing, coming] = await Promise.all([
          getShowingMovies(),

          getComingMovies(),
        ]);

        setShowingMovies(showing);

        setComingMovies(coming);

        // Set a featured movie (first from showing, or upcoming if no showing movies)
        if (showing.length > 0) {
          setFeaturedMovie(showing[0]);
        } else if (coming.length > 0) {
          setFeaturedMovie(coming[0]);
        }
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Không thể tải dữ liệu phim. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-purple-600" />
        <span className="ml-2 text-lg font-medium">Đang tải dữ liệu...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="rounded-lg bg-red-50 p-6 text-center text-red-800">
          <h2 className="mb-2 text-xl font-bold">Đã xảy ra lỗi</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  const handleQuickBooking = () => {
    // Handle the quick booking logic here
    if (selectedCinema && selectedMovie && selectedDate && selectedShowtime) {
      // Redirect to booking page or open booking modal
      console.log("Booking details:", {
        selectedCinema,
        selectedMovie,
        selectedDate,
        selectedShowtime,
      });
    } else {
      alert("Vui lòng chọn đầy đủ thông tin để đặt vé");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Quick Booking Section */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-indigo-900 to-purple-900 p-6 shadow-xl">
        <div className="flex flex-row items-center justify-between md:flex-row">
          <div className="mb-4 text-2xl font-bold text-white md:mb-0">
            ĐẶT VÉ NHANH
          </div>
          <div className="flex flex-nowrap items-center gap-2 overflow-auto">
            <div className="min-w-40">
              <select
                className="w-full rounded-md border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedCinema}
                onChange={(e) => setSelectedCinema(e.target.value)}
              >
                <option value="">1. Chọn Rạp</option>
                <option value="cinestar-q1">Cinestar Quận 1</option>
                <option value="cinestar-q2">Cinestar Quận 2</option>
                <option value="cinestar-q3">Cinestar Quận 3</option>
              </select>
            </div>
            <div className="min-w-40  ">
              <select
                className="w-100 rounded-md border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedMovie}
                onChange={(e) => setSelectedMovie(e.target.value)}
              >
                {" "}
                <option value="">2. Chọn Phim</option>
                {showingMovies.slice(0, 5).map((movie) => (
                  <option key={movie.id} value={movie.id}>
                    {movie.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="min-w-40">
              <select
                className="w-full rounded-md border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="">3. Chọn Ngày</option>
                <option value="2025-06-19">Hôm nay (19/06)</option>
                <option value="2025-06-20">Ngày mai (20/06)</option>
                <option value="2025-06-21">21/06/2025</option>
                <option value="2025-06-22">22/06/2025</option>
              </select>
            </div>
            <div className="min-w-40">
              <select
                className="w-full rounded-md border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                value={selectedShowtime}
                onChange={(e) => setSelectedShowtime(e.target.value)}
              >
                <option value="">4. Chọn Suất</option>
                <option value="10:00">10:00</option>
                <option value="12:30">12:30</option>
                <option value="15:00">15:00</option>
                <option value="17:30">17:30</option>
                <option value="20:00">20:00</option>
              </select>
            </div>
            <button
              onClick={handleQuickBooking}
              className="min-w-32 rounded-md bg-red-600 px-4 py-2 font-bold text-white transition-colors hover:bg-red-700"
            >
              ĐẶT NGAY
            </button>
          </div>
        </div>
      </div>

      {/* Featured Movie Banner */}
      {featuredMovie && <FeaturedMovie movie={featuredMovie} />}

      {/* Movie Sections */}
      <div className="my-8">
        {/* Now Showing Movies Section */}
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              <Film size={24} className="mr-2 inline-block" />
              Phim Đang Chiếu
            </h2>
            <a
              href="/movies/showing"
              className="text-purple-600 hover:underline dark:text-purple-400"
            >
              Xem thêm
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {showingMovies.slice(0, 4).map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>

        {/* Coming Soon Movies Section */}
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              <Calendar size={24} className="mr-2 inline-block" />
              Phim Sắp Chiếu
            </h2>
            <a
              href="/movies/coming"
              className="text-purple-600 hover:underline dark:text-purple-400"
            >
              Xem thêm
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {comingMovies.slice(0, 4).map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promotions Section */}
      <div className="my-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Ưu Đãi Đặc Biệt
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Promotion Cards */}
          <div className="rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white shadow-lg">
            <h3 className="mb-3 text-xl font-bold">Ưu đãi thành viên</h3>
            <p className="mb-4">
              Đăng ký thành viên CINESTAR để nhận ngay ưu đãi giảm 15% cho lần
              đặt vé đầu tiên
            </p>
            <button className="rounded-lg bg-white px-4 py-2 font-medium text-purple-600 transition-colors hover:bg-gray-100">
              Đăng ký ngay
            </button>
          </div>
          <div className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white shadow-lg">
            <h3 className="mb-3 text-xl font-bold">Combo tiết kiệm</h3>
            <p className="mb-4">
              Mua combo bắp nước chỉ từ 79.000đ - Tiết kiệm đến 25% so với mua
              lẻ
            </p>
            <button className="rounded-lg bg-white px-4 py-2 font-medium text-orange-600 transition-colors hover:bg-gray-100">
              Xem thêm
            </button>
          </div>
          <div className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white shadow-lg">
            <h3 className="mb-3 text-xl font-bold">Happy Wednesday</h3>
            <p className="mb-4">
              Giảm 30% giá vé mỗi thứ Tư hàng tuần khi thanh toán bằng thẻ Visa
            </p>
            <button className="rounded-lg bg-white px-4 py-2 font-medium text-blue-600 transition-colors hover:bg-gray-100">
              Chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
