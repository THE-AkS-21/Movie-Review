import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    username: string | null;
    login: (token: string, username: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    username: null,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));

    const login = (token: string, newUsername: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', newUsername);
        setUsername(newUsername);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};