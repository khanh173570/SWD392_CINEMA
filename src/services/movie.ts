import { Movie, MovieResponse } from "../types/customer";

const API_PATH = import.meta.env.VITE_API_PATH || "/api/v1";
const MOVIES_SHOWING_ENDPOINT =
  import.meta.env.VITE_API_MOVIES_SHOWING || "/movies/showing";
const MOVIES_UPCOMING_ENDPOINT =
  import.meta.env.VITE_API_MOVIES_UPCOMING || "/movies/upcoming";
const MOVIES_COMING_ENDPOINT =
  import.meta.env.VITE_API_MOVIES_COMING || "/movies/coming";

// Helper function to handle API requests
const fetchWithErrorHandling = async (url: string): Promise<MovieResponse> => {
  try {
    const response = await fetch(url);
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
      `/api${API_PATH}${MOVIES_SHOWING_ENDPOINT}`
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
      `/api${API_PATH}${MOVIES_UPCOMING_ENDPOINT}`
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
      `/api${API_PATH}${MOVIES_COMING_ENDPOINT}`
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
      `/api${API_PATH}/movies/${id}`
    );
    return response.metadata[0] || null;
  } catch (error) {
    console.error(`Failed to fetch movie with ID ${id}:`, error);
    return null;
  }
};
