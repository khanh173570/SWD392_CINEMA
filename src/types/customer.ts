// Các types cho dữ liệu phim và rạp chiếu

export interface Movie {
  id: string;
  name: string;
  image?: string;
  duration?: number;
  description?: string;
  trailer?: string;
  director?: string;
  cast?: string[] | string;
  releaseDate?: string;
  language?: string;
  ageRated?: string;
  genre?: string[] | string;
}

export interface MovieResponse {
  metadata: Movie[];
  status: boolean;
}

export interface Theater {
  id: number;
  name: string;
  location: string;
  imageUrl: string;
}

export interface Showtime {
  id: number;
  date: string;
  times: string[];
}

export interface CustomerData {
  movies: Movie[];
  theaters: Theater[];
  showtimes: Showtime[];
}
