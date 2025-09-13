import { User, LoginCredentials, ApiResponse, AppError } from '../types';
import api from '../api/axiosConfig';

/**
 * Authentication service for handling login, logout, and token management
 */

/**
 * Login user with credentials
 */
export const login = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  try {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/api/v1/auth/login', {
      username: credentials.username,
      password: credentials.password,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || 'Login failed');
    }

    return response.data.data;
  } catch (error: any) {
    const appError: AppError = {
      message: error.response?.data?.message || 'Login failed. Please check your credentials.',
      code: error.response?.data?.code || 'LOGIN_ERROR',
      status: error.response?.status || 500,
      details: error.response?.data?.details,
    };
    throw appError;
  }
};

/**
 * Logout user and invalidate token
 */
export const logout = async (): Promise<void> => {
  try {
    await api.post('/api/v1/auth/logout');
  } catch (error: any) {
    // Log error but don't throw - logout should always succeed locally
    console.error('Logout API error:', error);
  }
};

/**
 * Refresh authentication token
 */
export const refreshToken = async (): Promise<{ user?: User; token: string }> => {
  try {
    const response = await api.post<ApiResponse<{ user?: User; token: string }>>('/api/v1/auth/refresh');
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Token refresh failed');
    }

    return response.data.data;
  } catch (error: any) {
    const appError: AppError = {
      message: error.response?.data?.message || 'Token refresh failed',
      code: error.response?.data?.code || 'REFRESH_ERROR',
      status: error.response?.status || 401,
    };
    throw appError;
  }
};

/**
 * Register new user
 */
export const register = async (userData: {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}): Promise<{ user: User; token: string }> => {
  try {
    const response = await api.post<ApiResponse<{ user: User; token: string }>>('/api/v1/auth/register', userData);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Registration failed');
    }

    return response.data.data;
  } catch (error: any) {
    const appError: AppError = {
      message: error.response?.data?.message || 'Registration failed. Please try again.',
      code: error.response?.data?.code || 'REGISTER_ERROR',
      status: error.response?.status || 400,
      details: error.response?.data?.details,
    };
    throw appError;
  }
};

/**
 * Verify current token validity
 */
export const verifyToken = async (): Promise<boolean> => {
  try {
    const response = await api.get<ApiResponse<{ valid: boolean }>>('/api/v1/auth/verify');
    return response.data.success && response.data.data.valid;
  } catch (error) {
    return false;
  }
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get<ApiResponse<User>>('/api/v1/auth/me');
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch user data');
    }

    return response.data.data;
  } catch (error: any) {
    const appError: AppError = {
      message: error.response?.data?.message || 'Failed to fetch user data',
      code: error.response?.data?.code || 'USER_FETCH_ERROR',
      status: error.response?.status || 401,
    };
    throw appError;
  }
};