import React, { useEffect, useState } from "react";
import { Movie } from "../../types/customer";
import { getShowingMovies, getComingMovies, getMovieById } from "../../services/movie";
import { Loader2 } from "lucide-react";
import { Dialog } from "@headlessui/react";

const ManageMovies = () => {
  const [showingMovies, setShowingMovies] = useState<Movie[]>([]);
  const [comingMovies, setComingMovies] = useState<Movie[]>([]);
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"showing" | "coming">("showing");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [showing, coming] = await Promise.all([
          getShowingMovies(),
          getComingMovies(),
        ]);
        setShowingMovies(showing);
        setComingMovies(coming);
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

  const handleShowDetail = async (movieId: string | number) => {
    setModalLoading(true);
    setModalError(null);
    setSelectedMovie(null);
    try {
      const detail = await getMovieById(Number(movieId));
      if (detail) setSelectedMovie(detail);
      else setModalError("Không tìm thấy thông tin phim.");
    } catch (err) {
      setModalError("Lỗi khi tải chi tiết phim.");
    } finally {
      setModalLoading(false);
    }
  };

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

  const movies = activeTab === "showing" ? showingMovies : comingMovies;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setActiveTab("showing")}
          className={`px-4 py-2 rounded font-semibold shadow ${
            activeTab === "showing"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Phim Đang Chiếu
        </button>
        <button
          onClick={() => setActiveTab("coming")}
          className={`px-4 py-2 rounded font-semibold shadow ${
            activeTab === "coming"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Phim Sắp Chiếu
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
        <table className="w-full table-auto border-collapse bg-white">
          <thead className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white">
            <tr>
              <th className="border p-3">ID</th>
              <th className="border p-3">Hình Ảnh</th>
              <th className="border p-3">Tên</th>
              <th className="border p-3">Thời Gian</th>
              <th className="border p-3">Trạng Thái</th>
              <th className="border p-3">Mô Tả</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} className="hover:bg-gray-50 transition duration-200">
                <td className="border p-3 text-center text-gray-800 font-medium">
                  {movie.id}
                </td>
                <td className="border p-3 text-center">
                  <img
                    src={movie.image || "https://via.placeholder.com/80x100?text=No+Image"}
                    alt={movie.name}
                    className="mx-auto h-24 w-16 rounded-md shadow-md object-cover border border-gray-300"
                  />
                </td>
                <td className="border p-3 text-gray-900 font-semibold">{movie.name}</td>
                <td className="border p-3 text-center text-gray-700">
                  {movie.duration} phút
                </td>
                <td className="border p-3 text-center">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      activeTab === "showing"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {activeTab === "showing" ? "Đang Chiếu" : "Sắp Chiếu"}
                  </span>
                </td>
                <td className="border p-3 text-center">
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => handleShowDetail(movie.id)}
                  >
                    Chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {(selectedMovie || modalLoading || modalError) && (
        <Dialog
          open={true}
          onClose={() => { setSelectedMovie(null); setModalError(null); }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
          <div className="relative w-full max-w-2xl mx-auto z-10">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden ring-1 ring-black ring-opacity-5">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
                <Dialog.Title className="text-white text-2xl font-bold">
                  🎬 Thông Tin Phim
                </Dialog.Title>
              </div>
              <div className="px-6 py-5 space-y-3 text-sm text-gray-800 min-h-[120px]">
                {modalLoading && <div>Đang tải chi tiết phim...</div>}
                {modalError && <div className="text-red-600">{modalError}</div>}
                {selectedMovie && !modalLoading && !modalError && (
                  <div>
                    <div className="grid grid-cols-2 gap-4">
                      <p><strong>Tên:</strong> {selectedMovie?.name || "Chưa cập nhật"}</p>
                      <p><strong>Thời lượng:</strong> {selectedMovie?.duration ? `${selectedMovie.duration} phút` : "Chưa cập nhật"}</p>
                      <p><strong>Đạo diễn:</strong> {selectedMovie?.director || "Chưa cập nhật"}</p>
                      <p>
                        <strong>Diễn viên:</strong>{" "}
                        {Array.isArray(selectedMovie?.cast)
                          ? selectedMovie.cast.length > 0
                            ? selectedMovie.cast.join(", ")
                            : "Chưa cập nhật"
                          : selectedMovie?.cast || "Chưa cập nhật"}
                      </p>
                      <p>
                        <strong>Khởi chiếu:</strong>{" "}
                        {selectedMovie?.releaseDate
                          ? new Date(selectedMovie.releaseDate).toLocaleDateString("vi-VN")
                          : "Chưa cập nhật"}
                      </p>
                      <p><strong>Ngôn ngữ:</strong> {selectedMovie?.language || "Chưa cập nhật"}</p>
                      <p><strong>Độ tuổi:</strong> {selectedMovie?.ageRated || "Chưa cập nhật"}</p>
                      <p>
                        <strong>Thể loại:</strong>{" "}
                        {Array.isArray(selectedMovie?.genre)
                          ? selectedMovie.genre.length > 0
                            ? selectedMovie.genre.join(", ")
                            : "Chưa cập nhật"
                          : selectedMovie?.genre || "Chưa cập nhật"}
                      </p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="mb-2">
                        <strong>Trailer:</strong>{" "}
                        {selectedMovie.trailer ? (
                          <a
                            href={selectedMovie.trailer}
                            className="text-indigo-600 underline hover:text-indigo-800"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Xem trailer
                          </a>
                        ) : (
                          "Chưa có trailer"
                        )}
                      </p>
                      <p><strong>Mô tả:</strong> {selectedMovie.description || "Chưa có mô tả"}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-6 py-4 text-right">
                <button
                  onClick={() => { setSelectedMovie(null); setModalError(null); }}
                  className="inline-flex items-center gap-2 bg-purple-600 text-white font-medium px-4 py-2 rounded-md shadow hover:bg-purple-700 transition"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ManageMovies;
