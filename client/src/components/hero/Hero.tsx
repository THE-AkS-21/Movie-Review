import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
  Paper,
  Button,
  Typography,
  Box,
  IconButton,
  Chip,
  Rating,
  Card,
  CardContent,
  CardMedia,
  Grid,
  useTheme,
  useMediaQuery,
  Skeleton,
  Alert,
} from '@mui/material';
import {
  PlayCircleOutline as PlayIcon,
  Star as StarIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Movie } from '../../types';

interface HeroProps {
  movies: Movie[];
  isLoading?: boolean;
  error?: string | null;
}

const Hero: React.FC<HeroProps> = ({ movies, isLoading = false, error = null }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    if (movies.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % movies.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [movies.length]);

  const handlePlayTrailer = (movie: Movie) => {
    const trailerId = movie.trailerLink.substring(movie.trailerLink.length - 11);
    navigate(`/trailer/${trailerId}`);
  };

  const handleViewReviews = (movieId: string) => {
    navigate(`/reviews/${movieId}`);
  };

  const formatReleaseDate = (dateString: string) => {
    try {
      return new Date(dateString).getFullYear().toString();
    } catch {
      return dateString;
    }
  };

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ height: isMobile ? '400px' : '600px' }}>
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </Box>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          No movies available at the moment
        </Typography>
      </Box>
    );
  }

  const renderHeroSlide = (movie: Movie, index: number) => (
    <Paper
      key={movie.imdbID}
      sx={{
        position: 'relative',
        height: isMobile ? '400px' : '600px',
        color: '#fff',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%), url(${movie.backdrops?.[0] || movie.poster})`,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, rgba(25, 118, 210, 0.1) 0%, rgba(220, 0, 78, 0.1) 100%)',
        }}
      />
      
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          px: { xs: 2, md: 4 },
          py: { xs: 3, md: 4 },
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Movie Poster */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                maxWidth: isMobile ? 200 : 300,
                mx: 'auto',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <CardMedia
                component="img"
                height={isMobile ? 280 : 400}
                image={movie.poster}
                alt={movie.title}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>

          {/* Movie Info */}
          <Grid item xs={12} md={8}>
            <Box sx={{ maxWidth: 600 }}>
              <Typography
                variant={isMobile ? 'h4' : 'h2'}
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  lineHeight: 1.2,
                }}
              >
                {movie.title}
              </Typography>

              {/* Movie Meta Info */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                {movie.releaseDate && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarIcon fontSize="small" />
                    <Typography variant="body1">
                      {formatReleaseDate(movie.releaseDate)}
                    </Typography>
                  </Box>
                )}
                
                {movie.rating && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <StarIcon fontSize="small" color="warning" />
                    <Typography variant="body1">
                      {movie.rating.toFixed(1)}/10
                    </Typography>
                  </Box>
                )}

                {movie.duration && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <TimeIcon fontSize="small" />
                    <Typography variant="body1">{movie.duration}</Typography>
                  </Box>
                )}
              </Box>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  {movie.genres.slice(0, 3).map((genre, idx) => (
                    <Chip
                      key={idx}
                      label={genre}
                      size="small"
                      sx={{
                        mr: 1,
                        mb: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                        },
                      }}
                    />
                  ))}
                </Box>
              )}

              {/* Plot */}
              {movie.plot && (
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    opacity: 0.9,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                    lineHeight: 1.6,
                  }}
                >
                  {movie.plot.length > 200
                    ? `${movie.plot.substring(0, 200)}...`
                    : movie.plot}
                </Typography>
              )}

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<PlayIcon />}
                  onClick={() => handlePlayTrailer(movie)}
                  sx={{
                    backgroundColor: 'rgba(220, 0, 78, 0.9)',
                    backdropFilter: 'blur(10px)',
                    px: 3,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 4px 16px rgba(220, 0, 78, 0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(220, 0, 78, 1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(220, 0, 78, 0.4)',
                    },
                  }}
                >
                  Watch Trailer
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ViewIcon />}
                  onClick={() => handleViewReviews(movie.imdbID)}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    color: 'white',
                    px: 3,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  View Reviews
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <Carousel
        index={currentIndex}
        onChange={(index) => setCurrentIndex(index)}
        autoPlay={false}
        animation="fade"
        duration={800}
        indicators={true}
        navButtonsAlwaysVisible={!isMobile}
        navButtonsProps={{
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            borderRadius: '50%',
            width: 50,
            height: 50,
            backdropFilter: 'blur(10px)',
          },
        }}
        indicatorContainerProps={{
          style: {
            position: 'absolute',
            bottom: 20,
            zIndex: 3,
          },
        }}
        indicatorProps={{
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            width: 12,
            height: 12,
            margin: '0 4px',
          },
        }}
        activeIndicatorProps={{
          style: {
            backgroundColor: 'white',
            width: 12,
            height: 12,
            margin: '0 4px',
          },
        }}
      >
        {movies.map((movie, index) => renderHeroSlide(movie, index))}
      </Carousel>
    </Box>
  );
};

export default Hero;