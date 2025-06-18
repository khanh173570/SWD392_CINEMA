import React from "react";
import { Movie } from "../../types/customer";
import { CalendarDays, Clock, Film } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
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
    <div
      className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800"
      onClick={onClick}
    >
      {/* Age rating badge */}
      <div
        className={`absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${
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
      </div>

      {/* Image with hover effect */}
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={movie.image}
          alt={movie.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        {/* Hover overlay with play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <a
            href={movie.trailer}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-purple-600 p-3 text-white hover:bg-purple-700"
            onClick={(e) => e.stopPropagation()}
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
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 h-12 text-lg font-bold text-gray-900 dark:text-white">
          {movie.name}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Film className="h-4 w-4 text-purple-500" />
            <span className="line-clamp-1">{movie.genre}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-purple-500" />
            <span>{movie.duration} phút</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-purple-500" />
            <span>{formatReleaseDate(movie.releaseDate)}</span>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="p-4 pt-0">
        <button className="w-full rounded-lg bg-purple-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-purple-700">
          Đặt vé
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
