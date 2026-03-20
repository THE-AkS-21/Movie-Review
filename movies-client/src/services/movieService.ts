import { Movie, ApiResponse, PaginatedResponse, MovieFilters, AppError } from '../types';
import api from '../api/axiosConfig';

/**
 * Movie service for handling movie-related API operations
 */

/**
 * Get all movies with optional filtering and pagination
 */
export const getMovies = async (filters?: MovieFilters): Promise<Movie[]> => {
  try {
    const params = new URLSearchParams();
    
    if (filters?.genre) params.append('genre', filters.genre);
    if (filters?.year) params.append('year', filters.year.toString());
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await api.get<ApiResponse<Movie[]>>(`/movies`);
    console.log(response);
    console.log(response.data.success);

    if (!response.data) {
      throw new Error(response.data.message || 'Failed to fetch movies');
    }

    return response.data;
  } catch (error: any) {
    const appError: AppError = {
      message: error.response?.data?.message || 'Failed to fetch movies. Please try again later.',
      code: error.response?.data?.code || 'MOVIES_FETCH_ERROR',
      status: error.response?.status || 500,
    };
    throw appError;
  }
};

/**
 * Get movies with pagination
 */
export const getMoviesPaginated = async (
  page: number = 1,
  limit: number = 10,
  filters?: MovieFilters
): Promise<PaginatedResponse<Movie>> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (filters?.genre) params.append('genre', filters.genre);
    if (filters?.year) params.append('year', filters.year.toString());
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.search) params.append('search', filters.search);
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await api.get<ApiResponse<PaginatedResponse<Movie>>>(`/movies/paginated?${params.toString()}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch movies');
    }

    return response.data.data;
  } catch (error: any) {
    const appError: AppError = {
      message: error.response?.data?.message || 'Failed to fetch movies. Please try again later.',
      code: error.response?.data?.code || 'MOVIES_PAGINATED_ERROR',
      status: error.response?.status || 500,
    };
    throw appError;
  }
};

/**
 * Get a single movie by ID
 */
export const getMovie = async (id: string): Promise<Movie> => {
  try {
    const response = await api.get<ApiResponse<Movie>>(`/movies/${id}`);
    var result = response.data;
    if (!response.data) {
      throw new Error(response.data.message || 'Movie not found');
    }
    return result;

  } catch (error: any) {
    const appError: AppError = {
      message: error.response?.data?.message || 'Failed to fetch movie details. Please try again later.',
      code: error.response?.data?.code || 'MOVIE_FETCH_ERROR',
      status: error.response?.status || 404,
    };
    throw appError;
  }
};

/**
 * Search movies by title or other criteria
 */
export const searchMovies = async (query: string, filters?: Omit<MovieFilters, 'search'>): Promise<Movie[]> => {
  try {
    const params = new URLSearchParams({ search: query });
    
    if (filters?.genre) params.append('genre', filters.genre);
    if (filters?.year) params.append('year', filters.year.toString());
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.sortBy) params.append('sortBy', filters.sortBy);
    if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

    const response = await api.get<ApiResponse<Movie[]>>(`/movies/search?${params.toString()}`);
    
    if (!response.data) {
      throw new Error(response.data.message || 'Search failed');
    }

    return response.data;
  } catch (error: any) {
    const appError: AppError = {
      message: error.response?.data?.message || 'Search failed. Please try again later.',
      code: error.response?.data?.code || 'MOVIE_SEARCH_ERROR',
      status: error.response?.status || 500,
    };
    throw appError;
  }
};

/**
 * Get movies by genre
 */
export const getMoviesByGenre = async (genre: string): Promise<Movie[]> => {
  try {
    const response = await api.get<ApiResponse<Movie[]>>(`/movies/genre/${encodeURIComponent(genre)}`);
    
    if (!response.data) {
      throw new Error(response.data.message || 'Failed to fetch movies by genre');
    }

    return response.data;
  } catch (error: any) {
    const appError: AppError = {
      message: error.response?.data?.message || 'Failed to fetch movies by genre. Please try again later.',
      code: error.response?.data?.code || 'MOVIES_BY_GENRE_ERROR',
      status: error.response?.status || 500,
    };
    throw appError;
  }
};

/**
 * Get featured/popular movies
 */
export const getFeaturedMovies = async (limit: number = 10): Promise<Movie[]> => {
  try {
    const response = await api.get<ApiResponse<Movie[]>>(`/movies/featured?limit=${limit}`);
    
    if (!response.data) {
      throw new Error(response.data.message || 'Failed to fetch featured movies');
    }

    return response.data;
  } catch (error: any) {
    const appError: AppError = {
      message: error.response?.data?.message || 'Failed to fetch featured movies. Please try again later.',
      code: error.response?.data?.code || 'FEATURED_MOVIES_ERROR',
      status: error.response?.status || 500,
    };
    throw appError;
  }
};

/**
 * Get available genres
 */
export const getGenres = async (): Promise<string[]> => {
  try {
    const response = await api.get<ApiResponse<string[]>>('/movies/genres');
    
    if (!response.data) {
      throw new Error(response.data.message || 'Failed to fetch genres');
    }

    return response.data;
  } catch (error: any) {
    const appError: AppError = {
      message: error.response?.data?.message || 'Failed to fetch genres. Please try again later.',
      code: error.response?.data?.code || 'GENRES_FETCH_ERROR',
      status: error.response?.status || 500,
    };
    throw appError;
  }
};