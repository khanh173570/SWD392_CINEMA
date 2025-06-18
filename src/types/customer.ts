// Các types cho dữ liệu phim và rạp chiếu

export interface Movie {
  id: number;
  name: string;
  image: string;
  duration: number;
  releaseDate: string;
  genre: string;
  trailer: string;
  ageRated: number;
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
