import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { User, AuthContextType, LoginCredentials, AppError } from '../types';
import { login as apiLogin, refreshToken as apiRefreshToken, logout as apiLogout } from '../services/authService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Initialize authentication state on app load
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          // Verify token is still valid
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setToken(storedToken);
          } catch (error) {
            // Invalid stored data, clear it
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login function with proper error handling
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiLogin(credentials);
      
      // Store authentication data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
      setToken(response.token);
    } catch (error) {
      const appError = error as AppError;
      throw new Error(appError.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout function with API call
   */
  const logout = useCallback(async (): Promise<void> => {
    try {
      // Call logout API if token exists
      if (token) {
        await apiLogout();
      }
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API fails
    } finally {
      // Clear local state regardless of API call result
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      setToken(null);
    }
  }, [token]);

  /**
   * Refresh token function
   */
  const refreshToken = useCallback(async (): Promise<void> => {
    try {
      if (!token) {
        throw new Error('No token to refresh');
      }

      const response = await apiRefreshToken();
      
      // Update stored token
      localStorage.setItem('token', response.token);
      setToken(response.token);
      
      // Update user data if provided
      if (response.user) {
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      // If refresh fails, logout user
      await logout();
      throw error;
    }
  }, [token, logout]);

  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};