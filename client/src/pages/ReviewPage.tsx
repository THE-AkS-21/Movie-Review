import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Divider,
  Box,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Rating,
  Avatar,
  Button,
  useTheme,
  useMediaQuery,
  Skeleton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  PlayCircleOutline as PlayIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { Movie, Review } from '../types';
import ReviewForm from '../components/reviewForm/ReviewForm';
import { getMovie } from '../services/movieService';

const ReviewPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const { movieId } = useParams<{ movieId: string }>();
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (movieId) {
      getMovieData(movieId);
    }
  }, [movieId]);

  const getMovieData = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const movieData = await getMovie(id);
      setMovie(movieData);
      setReviews(movieData.reviews || []);
    } catch (err: any) {
      console.error('Error fetching movie:', err);
      setError(err.message || 'Could not load reviews for this movie. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const addReview = (newReview: Review) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
  };

  const handlePlayTrailer = () => {
    if (movie?.trailerLink) {
      const trailerId = movie.trailerLink.substring(movie.trailerLink.length - 11);
      navigate(`/trailer/${trailerId}`);
    }
  };

  const formatReleaseDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const formatReviewDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return totalRating / reviews.length;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="rectangular" height={40} width={200} sx={{ mb: 2 }} />
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={300} sx={{ mb: 3 }} />
            <Skeleton variant="rectangular" height={200} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          variant="outlined"
        >
          Go Back
        </Button>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Alert severity="warning">
          Movie not found.
        </Alert>
      </Container>
    );
  }

  const averageRating = getAverageRating();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          variant="outlined"
          sx={{ mb: 3 }}
        >
          Go Back
        </Button>
        
        <Typography variant="h4" component="h1" gutterBottom>
          {movie.title}
        </Typography>
        
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Movie Reviews & Discussion
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Movie Info Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardMedia
              component="img"
              height={400}
              image={movie.poster}
              alt={movie.title}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {movie.title}
              </Typography>

              {/* Movie Meta Info */}
              <Box sx={{ mb: 2 }}>
                {movie.releaseDate && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <CalendarIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {formatReleaseDate(movie.releaseDate)}
                    </Typography>
                  </Box>
                )}

                {movie.duration && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TimeIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {movie.duration}
                    </Typography>
                  </Box>
                )}

                {averageRating > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <StarIcon fontSize="small" color="warning" />
                    <Typography variant="body2" color="text.secondary">
                      {averageRating.toFixed(1)}/5 ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  {movie.genres.map((genre, idx) => (
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

              {/* Plot */}
              {movie.plot && (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {movie.plot}
                </Typography>
              )}

              {/* Trailer Button */}
              {movie.trailerLink && (
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<PlayIcon />}
                  onClick={handlePlayTrailer}
                  sx={{ mt: 2 }}
                >
                  Watch Trailer
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Reviews Section */}
        <Grid item xs={12} md={8}>
          {/* Review Form */}
          <ReviewForm movieId={movieId!} onReviewAdded={addReview} />

          <Divider sx={{ my: 4 }} />

          {/* Reviews List */}
          <Box>
            <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3 }}>
              Reviews ({reviews.length})
            </Typography>

            {reviews.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {reviews.map((review, index) => (
                  <Paper
                    key={review.id || index}
                    elevation={1}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      transition: 'box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <PersonIcon />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            Anonymous User
                          </Typography>
                          {review.createdAt && (
                            <Typography variant="caption" color="text.secondary">
                              • {formatReviewDate(review.createdAt)}
                            </Typography>
                          )}
                        </Box>
                        
                        {review.rating && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Rating
                              value={review.rating}
                              size="small"
                              readOnly
                              sx={{
                                '& .MuiRating-iconFilled': {
                                  color: theme.palette.warning.main,
                                },
                              }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {review.rating}/5
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Box>
                    
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {review.body}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            ) : (
              <Paper
                sx={{
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: 'grey.50',
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No reviews yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Be the first to share your thoughts about this movie!
                </Typography>
              </Paper>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReviewPage;