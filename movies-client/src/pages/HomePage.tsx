import { useState, useEffect } from 'react';
import { getMovies } from '../services/movieService';
import { Movie } from '../types';
import Hero from '../components/hero/Hero';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Rating,
  Skeleton,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Paper,
} from '@mui/material';
import {
  PlayCircleOutline as PlayIcon,
  CalendarToday as CalendarIcon,
  Visibility as ViewIcon,
  CloudOff as CloudOffIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
      <div
          role="tabpanel"
          hidden={value !== index}
          id={`movie-tabpanel-${index}`}
          aria-labelledby={`movie-tab-${index}`}
          {...other}
      >
        {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
      </div>
  );
};

const HomePage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const moviesData = await getMovies();

      setMovies(moviesData);
      setFeaturedMovies(moviesData.slice(0, 3));
    } catch (err: any) {
      console.error('Error fetching movies:', err);
      setError("Oops! We couldn't load the movies right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  if (error && !loading) {
    return (
        <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
          <Paper
              elevation={0}
              sx={{
                p: { xs: 4, md: 8 },
                textAlign: 'center',
                borderRadius: 4,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'grey.50',
                border: `1px solid ${theme.palette.divider}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh'
              }}
          >
            <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  backgroundColor: 'error.light',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 4,
                  opacity: 0.9
                }}
            >
              <CloudOffIcon sx={{ fontSize: 50, color: 'error.contrastText' }} />
            </Box>

            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="text.primary">
              Service Unavailable
            </Typography>

            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 500, mb: 4 }}>
              {error} Our servers might be taking a quick break or experiencing a temporary hiccup. Please check your connection and try refreshing the page.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<RefreshIcon />}
                onClick={fetchData}
                sx={{ px: 4, py: 1.5, borderRadius: 2 }}
            >
              Try Again
            </Button>
          </Paper>
        </Container>
    );
  }

  // FIXED: Changed to curly braces and added the return statement
  const renderMovieCard = (movie: Movie) => {
    const movieId = movie.imdbID || (movie as any).imdbId || Math.random().toString();
    return (
        <Card
            key={movieId}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[8],
              },
            }}
        >
          <CardMedia
              component="img"
              height={300}
              image={movie.poster}
              alt={movie.title}
              sx={{ objectFit: 'cover' }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="h3" gutterBottom noWrap>
              {movie.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              {movie.rating && (
                  <>
                    <Rating value={movie.rating / 2} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      {movie.rating.toFixed(1)}
                    </Typography>
                  </>
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              {movie.releaseDate && (
                  <>
                    <CalendarIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {formatReleaseDate(movie.releaseDate)}
                    </Typography>
                  </>
              )}
            </Box>

            {movie.genres && movie.genres.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  {movie.genres.slice(0, 2).map((genre, idx) => (
                      <Chip
                          key={idx}
                          label={genre}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5 }}
                          color="primary"
                          variant="outlined"
                      />
                  ))}
                </Box>
            )}
          </CardContent>

          <CardActions sx={{ p: 2, pt: 0 }}>
            <Button
                size="small"
                startIcon={<PlayIcon />}
                onClick={() => handlePlayTrailer(movie)}
                variant="outlined"
            >
              Trailer
            </Button>
            <Button
                size="small"
                startIcon={<ViewIcon />}
                onClick={() => handleViewReviews(movie.imdbID || (movie as any).imdbId)}
                variant="contained"
            >
              Reviews
            </Button>
          </CardActions>
        </Card>
    );
  };

  const renderSkeletonGrid = () => (
      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <Skeleton variant="rectangular" height={300} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" height={24} width="60%" />
                  <Skeleton variant="text" height={20} width="40%" />
                </CardContent>
                <CardActions>
                  <Skeleton variant="rectangular" height={36} width={80} />
                  <Skeleton variant="rectangular" height={36} width={80} />
                </CardActions>
              </Card>
            </Grid>
        ))}
      </Grid>
  );

  return (
      <Box>
        {/* Hero Section */}
        <Hero movies={movies.slice(0, 5)} isLoading={loading} error={error} />

        {/* Content Section */}
        <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
            Discover Movies
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
                value={tabValue}
                onChange={(_, newValue) => setTabValue(newValue)}
                centered
                variant={isMobile ? 'fullWidth' : 'standard'}
                textColor="primary"
                indicatorColor="primary"
            >
              <Tab label="All Movies" sx={{ fontWeight: 600 }} />
              <Tab label="Featured" sx={{ fontWeight: 600 }} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            {loading ? (
                renderSkeletonGrid()
            ) : (
                <Grid container spacing={3}>
                  {movies.map((movie, index) => {
                    const movieId = movie.imdbID || (movie as any).imdbId || `movie-${index}`;
                    return (
                        <Grid item xs={12} sm={6} md={4} key={movieId}>
                          {renderMovieCard(movie)}
                        </Grid>
                    );
                  })}
                </Grid>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {loading ? (
                renderSkeletonGrid()
            ) : (
                <Grid container spacing={3}>
                  {featuredMovies.map((movie, index) => {
                    const movieId = movie.imdbID || (movie as any).imdbId || `feat-${index}`;
                    return (
                        <Grid item xs={12} sm={6} md={4} key={movieId}>
                          {renderMovieCard(movie)}
                        </Grid>
                    );
                  })}
                </Grid>
            )}
          </TabPanel>
        </Container>
      </Box>
  );
};

export default HomePage;