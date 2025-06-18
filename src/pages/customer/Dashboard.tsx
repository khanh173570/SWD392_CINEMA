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
  const [activeTab, setActiveTab] = useState<"showing" | "coming">("showing");

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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Movie Banner */}
      {featuredMovie && <FeaturedMovie movie={featuredMovie} />}

      {/* Movie Section with Tabs */}
      <div className="my-8">
        {/* Tab Navigation */}{" "}
        <div className="mb-6 flex">
          <button
            onClick={() => setActiveTab("showing")}
            className={`movie-tab ${
              activeTab === "showing"
                ? "movie-tab-active"
                : "movie-tab-inactive"
            }`}
          >
            <Film size={20} />
            Phim Đang Chiếu
          </button>
          <button
            onClick={() => setActiveTab("coming")}
            className={`movie-tab ${
              activeTab === "coming" ? "movie-tab-active" : "movie-tab-inactive"
            }`}
          >
            <Calendar size={20} />
            Phim Sắp Chiếu
          </button>
        </div>
        {/* Tab Content */}
        <div className="min-h-[600px] rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          {activeTab === "showing" ? (
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Phim Đang Chiếu
              </h2>
              {showingMovies.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {showingMovies.map((movie) => (
                      <div key={movie.id}>
                        <MovieCard movie={movie} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-center">
                    <a
                      href="/movies/showing"
                      className="rounded-lg bg-purple-600 px-6 py-3 text-center font-medium text-white shadow-md transition-colors hover:bg-purple-700"
                    >
                      Xem tất cả phim đang chiếu
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex h-64 items-center justify-center">
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    Không có phim đang chiếu
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                Phim Sắp Chiếu
              </h2>
              {comingMovies.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {comingMovies.map((movie) => (
                      <div key={movie.id}>
                        <MovieCard movie={movie} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex justify-center">
                    <a
                      href="/movies/coming"
                      className="rounded-lg bg-purple-600 px-6 py-3 text-center font-medium text-white shadow-md transition-colors hover:bg-purple-700"
                    >
                      Xem tất cả phim sắp chiếu
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex h-64 items-center justify-center">
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    Không có phim sắp chiếu
                  </p>
                </div>
              )}
            </div>
          )}
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
