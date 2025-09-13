// src/components/hero/Hero.tsx
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography, Box, IconButton } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link } from 'react-router-dom';
import { Movie } from '../../types';

interface HeroProps {
    movies: Movie[];
}

const Hero: React.FC<HeroProps> = ({ movies }) => {
    return (
        <Carousel>
            {movies.map((movie) => (
                <Paper key={movie.imdbID}
                       sx={{
                           position: 'relative',
                           height: '550px',
                           color: '#fff',
                           backgroundSize: 'cover',
                           backgroundRepeat: 'no-repeat',
                           backgroundPosition: 'center',
                           backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), url(${movie.backdrops[0]})`,
                       }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 20,
                            left: 20,
                            right: 20,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                        }}
                    >
                        <img src={movie.poster} alt={movie.title} style={{ height: '300px', borderRadius: '10px' }} />
                        <Box>
                            <Typography variant="h4" component="h2">{movie.title}</Typography>
                            <Box sx={{ mt: 2 }}>
                                <Link to={`/trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                                    <IconButton color="warning" sx={{ fontSize: '4rem' }}>
                                        <PlayCircleOutlineIcon fontSize="inherit" />
                                    </IconButton>
                                </Link>
                                <Button variant="contained" component={Link} to={`/reviews/${movie.imdbID}`} sx={{ ml: 2 }}>
                                    Reviews
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            ))}
        </Carousel>
    );
};

export default Hero;