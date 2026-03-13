import { LoginCredentials } from '../types';
import api from '../api/axiosConfig';

export const login = async (credentials: LoginCredentials): Promise<{ token: string; username: string }> => {
    try {
        const response = await api.post<{ token: string; username: string }>('/auth/login', credentials);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Login failed. Please check your credentials.');
    }
};

export const register = async (userData: { username: string; password: string }): Promise<string> => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data.message;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
    }
};

export const logout = async (token: string): Promise<void> => {
    try {
        await api.post('/auth/logout', null, {
            headers: { Authorization: `Bearer ${token}` }
        });
    } catch (error: any) {
        console.error('Logout API error:', error);
    }
};