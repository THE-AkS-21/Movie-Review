// src/components/header/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import MovieIcon from '@mui/icons-material/Movie';

const Header: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <MovieIcon sx={{ mr: 2 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Movie Reviews
                </Typography>
                <Box>
                    <Button color="inherit" component={NavLink} to="/">Home</Button>
                    {isAuthenticated ? (
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button color="inherit" component={NavLink} to="/login">Login</Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;