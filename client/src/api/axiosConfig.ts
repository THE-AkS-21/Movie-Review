import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { AppError } from '../types';

/**
 * Axios configuration with interceptors for authentication and error handling
 */

// Create axios instance with default configuration
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true', // For ngrok development
  },
});

/**
 * Request interceptor to add authentication token
 */
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp for debugging
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error: AxiosError) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for handling responses and errors
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response time for debugging
    if (response.config.metadata?.startTime) {
      const endTime = new Date();
      const duration = endTime.getTime() - response.config.metadata.startTime.getTime();
      console.log(`API call to ${response.config.url} took ${duration}ms`);
    }
    
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        const refreshResponse = await axios.post(`${api.defaults.baseURL}/api/v1/auth/refresh`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (refreshResponse.data.success) {
          const newToken = refreshResponse.data.data.token;
          localStorage.setItem('token', newToken);
          
          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    // Handle network errors
    if (!error.response) {
      const networkError: AppError = {
        message: 'Network error. Please check your internet connection.',
        code: 'NETWORK_ERROR',
        status: 0,
      };
      return Promise.reject(networkError);
    }
    
    // Handle HTTP errors
    const appError: AppError = {
      message: error.response.data?.message || error.message || 'An unexpected error occurred',
      code: error.response.data?.code || `HTTP_${error.response.status}`,
      status: error.response.status,
      details: error.response.data?.details || error.response.data,
    };
    
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response.status,
      message: appError.message,
      data: error.response.data,
    });
    
    return Promise.reject(appError);
  }
);

/**
 * Utility function to handle API errors consistently
 */
export const handleApiError = (error: any): AppError => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'Server error occurred',
      code: error.response.data?.code || `HTTP_${error.response.status}`,
      status: error.response.status,
      details: error.response.data?.details,
    };
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'No response from server. Please check your connection.',
      code: 'NO_RESPONSE',
      status: 0,
    };
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR',
      status: 0,
    };
  }
};

/**
 * Utility function to create query parameters
 */
export const createQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  return searchParams.toString();
};

export default api;