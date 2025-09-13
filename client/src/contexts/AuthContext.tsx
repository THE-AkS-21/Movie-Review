import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { login as apiLogin, LoginCredentials } from '../services/authService';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        // In a real app, you would verify the token here and fetch user data
        if (token) {
            // For simplicity, we are setting a dummy user.
            // A real implementation would decode the token or make an API call.
            setUser({ username: 'dummyUser' });
        }
    }, [token]);

    const login = async (credentials: LoginCredentials) => {
        const { user, token } = await apiLogin(credentials);
        localStorage.setItem('token', token);
        setUser(user);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};