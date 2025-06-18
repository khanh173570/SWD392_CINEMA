import React from "react";
import { Movie } from "../../types/customer";
import { CalendarDays, Clock, Film } from "lucide-react";

interface FeaturedMovieProps {
  movie: Movie;
}

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ movie }) => {
  // Format release date
  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="relative mb-8 overflow-hidden rounded-xl">
      {/* Background image with overlay */}
      <div className="relative h-[500px] w-full">
        <img
          src={movie.image}
          alt={movie.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center p-8 lg:p-16">
        <div className="max-w-2xl">
          {/* Age rating badge */}
          <span
            className={`mb-4 inline-block rounded-md px-3 py-1 text-sm font-bold text-white ${
              movie.ageRated === 0
                ? "bg-green-500"
                : movie.ageRated <= 13
                ? "bg-yellow-500"
                : movie.ageRated <= 16
                ? "bg-orange-500"
                : "bg-red-600"
            }`}
          >
            {movie.ageRated === 0 ? "P" : movie.ageRated}+
          </span>

          <h1 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
            {movie.name}
          </h1>

          <div className="mb-6 flex flex-wrap gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Film className="h-5 w-5" />
              <span>{movie.genre}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{movie.duration} phút</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              <span>{formatReleaseDate(movie.releaseDate)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={movie.trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 font-medium text-white transition-colors hover:bg-purple-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Xem Trailer
            </a>
            <button className="rounded-lg bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-100">
              Đặt vé ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
