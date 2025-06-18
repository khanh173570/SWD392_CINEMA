import React, { useRef } from "react";
import { Movie } from "../../types/customer";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  viewAllLink?: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({
  title,
  movies,
  viewAllLink,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        {viewAllLink && (
          <a
            href={viewAllLink}
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            Xem tất cả
          </a>
        )}
      </div>

      <div className="relative">
        {/* Left scroll button */}
        <button
          onClick={scrollLeft}
          className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-white" />
        </button>

        {/* Movie cards carousel */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-[220px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        <button
          onClick={scrollRight}
          className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-all hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800"
        >
          <ChevronRight className="h-6 w-6 text-gray-800 dark:text-white" />
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;
