// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { getMovies } from '../services/movieService';
import { Movie } from '../types';
import Hero from '../components/hero/Hero'; // We will create this next
import { Box, CircularProgress, Typography } from '@mui/material';

const HomePage: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movieData = await getMovies();
                setMovies(movieData);
            } catch (err) {
                setError('Failed to fetch movies. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Typography color="error" align="center" sx={{ mt: 4 }}>{error}</Typography>;
    }

    return <Hero movies={movies} />;
};

export default HomePage;