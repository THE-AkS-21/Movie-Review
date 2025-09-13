import { User } from '../types';

// Define the type for login credentials
export interface LoginCredentials {
    username: string;
    password?: string; // Password might not always be needed depending on auth flow
}

// Mock login function - replace with your actual API call
export const login = async (credentials: LoginCredentials): Promise<{ user: User, token: string }> => {
    console.log('Logging in with:', credentials);
    // In a real app, you would make an API call here:
    // const response = await api.post('/auth/login', credentials);
    // return response.data;

    // For now, return mock data
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                user: { username: credentials.username },
                token: 'fake-jwt-token'
            });
        }, 1000);
    });
};