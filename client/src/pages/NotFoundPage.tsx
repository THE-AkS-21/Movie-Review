// src/pages/NotFoundPage.tsx
import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '60vh',
                textAlign: 'center',
            }}
        >
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                The page you are looking for does not exist.
            </Typography>
            <Button variant="contained" component={Link} to="/">
                Go to Homepage
            </Button>
        </Box>
    );
};

export default NotFoundPage;