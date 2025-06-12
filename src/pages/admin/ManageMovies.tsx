import React, { useState } from "react";

interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: number;
  releaseDate: string;
  director: string;
  status: string;
  poster: string;
}

const ManageMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([
    {
      id: 1,
      title: "Avengers: Endgame",
      genre: "Hành động, Khoa học viễn tưởng",
      duration: 181,
      releaseDate: "2023-06-10",
      director: "Anthony Russo, Joe Russo",
      status: "showing",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
    },
    {
      id: 2,
      title: "Parasite",
      genre: "Hài kịch đen, Kinh dị",
      duration: 132,
      releaseDate: "2023-06-15",
      director: "Bong Joon-ho",
      status: "upcoming",
      poster:
        "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    },
    {
      id: 3,
      title: "Joker",
      genre: "Tâm lý, Tội phạm",
      duration: 122,
      releaseDate: "2023-05-20",
      director: "Todd Phillips",
      status: "showing",
      poster:
        "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
    },
    {
      id: 4,
      title: "Dune",
      genre: "Phiêu lưu, Khoa học viễn tưởng",
      duration: 155,
      releaseDate: "2023-07-05",
      director: "Denis Villeneuve",
      status: "upcoming",
      poster:
        "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
    },
    {
      id: 5,
      title: "The Shawshank Redemption",
      genre: "Chính kịch",
      duration: 142,
      releaseDate: "2023-04-25",
      director: "Frank Darabont",
      status: "ended",
      poster:
        "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Filter movies based on selections
  const filteredMovies = movies.filter((movie) => {
    const genreMatches =
      selectedGenre === "all" ||
      movie.genre.toLowerCase().includes(selectedGenre.toLowerCase());
    const statusMatches =
      selectedStatus === "all" || movie.status === selectedStatus;
    return genreMatches && statusMatches;
  });

  const genreOptions = [
    "Hành động",
    "Tâm lý",
    "Kinh dị",
    "Hài",
    "Khoa học viễn tưởng",
    "Chính kịch",
    "Hoạt hình",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý phim</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center"
        >
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
          Thêm phim mới
        </button>
      </div>

      {/* Filter and search section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thể loại
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả</option>
              {genreOptions.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Tất cả</option>
              <option value="showing">Đang chiếu</option>
              <option value="upcoming">Sắp chiếu</option>
              <option value="ended">Đã kết thúc</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tìm kiếm
            </label>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên phim..."
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    movie.status === "showing"
                      ? "bg-green-100 text-green-800"
                      : movie.status === "upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {movie.status === "showing"
                    ? "Đang chiếu"
                    : movie.status === "upcoming"
                    ? "Sắp chiếu"
                    : "Đã kết thúc"}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{movie.genre}</p>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
              </div>
              <p className="text-sm text-gray-500 mb-3">
                <span className="font-medium">Đạo diễn:</span> {movie.director}
              </p>
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors duration-200">
                  Chỉnh sửa
                </button>
                <button className="bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-md transition-colors duration-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <div className="text-sm text-gray-600">
          Hiển thị 1-{filteredMovies.length} trong tổng số{" "}
          {filteredMovies.length} phim
        </div>
        <div className="flex space-x-1">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50">
            Trước
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-blue-600 text-white">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm">
            Sau
          </button>
        </div>
      </div>

      {/* Modal to add a new movie - placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Thêm phim mới
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên phim
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thể loại
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập thể loại, phân cách bằng dấu phẩy"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời lượng (phút)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngày khởi chiếu
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đạo diễn
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trạng thái
                  </label>
                  <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="showing">Đang chiếu</option>
                    <option value="upcoming">Sắp chiếu</option>
                    <option value="ended">Đã kết thúc</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Poster URL
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập URL hình ảnh poster"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 mr-2 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMovies;
