// Các types cho dữ liệu phim và rạp chiếu

export interface Movie {
  id: number;
  title: string;
  rating: string;
  genre: string[];
  releaseDate: string;
  imageUrl: string;
  description: string;
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
