import { Movie, MovieResponse } from "../types/customer";
import api from "./api";

// Using proxy through Vite to avoid CORS issues
const API_VERSION = import.meta.env.VITE_API_PATH || "/api/v1";
const MOVIES_SHOWING_ENDPOINT = `${API_VERSION}${
  import.meta.env.VITE_API_MOVIES_SHOWING || "/movies/showing"
}`;
const MOVIES_UPCOMING_ENDPOINT = `${API_VERSION}${
  import.meta.env.VITE_API_MOVIES_UPCOMING || "/movies/upcoming"
}`;
const MOVIES_COMING_ENDPOINT = `${API_VERSION}${
  import.meta.env.VITE_API_MOVIES_COMING || "/movies/coming"
}`;
const MOVIE_DETAILS_ENDPOINT = `${API_VERSION}${
  import.meta.env.VITE_API_MOVIE_DETAILS || "/movies"
}`;

// Helper function to handle API requests
const fetchWithErrorHandling = async (
  endpoint: string
): Promise<MovieResponse> => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Get currently showing movies
export const getShowingMovies = async (): Promise<Movie[]> => {
  try {
    const response: MovieResponse = await fetchWithErrorHandling(
      MOVIES_SHOWING_ENDPOINT
    );
    return response.metadata;
  } catch (error) {
    console.error("Failed to fetch showing movies:", error);
    return [];
  }
};

// Get upcoming movies
export const getUpcomingMovies = async (): Promise<Movie[]> => {
  try {
    const response: MovieResponse = await fetchWithErrorHandling(
      MOVIES_UPCOMING_ENDPOINT
    );
    return response.metadata;
  } catch (error) {
    console.error("Failed to fetch upcoming movies:", error);
    return [];
  }
};

// Get coming movies
export const getComingMovies = async (): Promise<Movie[]> => {
  try {
    const response: MovieResponse = await fetchWithErrorHandling(
      MOVIES_COMING_ENDPOINT
    );
    return response.metadata;
  } catch (error) {
    console.error("Failed to fetch coming movies:", error);
    return [];
  }
};

// Get movie details by ID
export const getMovieById = async (id: number): Promise<Movie | null> => {
  try {
    const response: MovieResponse = await fetchWithErrorHandling(
      `${MOVIE_DETAILS_ENDPOINT}/${id}`
    );
    // Nếu metadata là object (API đúng chuẩn), trả về luôn object
    if (
      response &&
      response.metadata &&
      typeof response.metadata === "object" &&
      !Array.isArray(response.metadata)
    ) {
      return response.metadata;
    }
    // Nếu metadata là mảng (API cũ), lấy phần tử đầu tiên
    if (response && Array.isArray(response.metadata)) {
      return response.metadata[0] || null;
    }
    return null;
  } catch (error) {
    console.error(`Failed to fetch movie with ID ${id}:`, error);
    return null;
  }
};
