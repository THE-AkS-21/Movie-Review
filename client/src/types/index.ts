// Type definitions for the Movie Review application

/**
 * Review entity interface matching the backend Review.java
 */
export interface Review {
  id?: string;
  body: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
  movieId?: string;
}

/**
 * Movie entity interface matching the backend Movie.java
 */
export interface Movie {
  imdbID: string;
  title: string;
  releaseDate: string;
  trailerLink: string;
  poster: string;
  genres: string[];
  backdrops: string[];
  reviewIds: Review[];
  plot?: string;
  director?: string;
  cast?: string[];
  rating?: number;
  duration?: string;
}

/**
 * User interface for authentication
 */
export interface User {
  id: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Authentication context type
 */
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * API response wrapper interface
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

/**
 * Pagination interface for API responses
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Error interface for consistent error handling
 */
export interface AppError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, any>;
}

/**
 * Form validation error interface
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Movie filter options interface
 */
export interface MovieFilters {
  genre?: string;
  year?: number;
  rating?: number;
  search?: string;
  sortBy?: 'title' | 'releaseDate' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Review form data interface
 */
export interface ReviewFormData {
  body: string;
  rating?: number;
  movieId: string;
}

/**
 * Theme mode type
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Loading state interface
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Component props with common patterns
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * API endpoint configuration
 */
export interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}