// src/pages/ReviewPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Typography, Paper, Divider, Box, CircularProgress, Alert } from '@mui/material';
import { Movie, Review } from '../types';
import ReviewForm from "../components/reviewForm/ReviewForm";
import { getMovie } from "../services/movieService";

const ReviewsPage = () => {
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
            setReviews(movieData.reviewIds || []);
        } catch (err) {
            console.error(err);
            setError('Could not load reviews for this movie. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const addReview = (newReview: Review) => {
        setReviews(prevReviews => [newReview, ...prevReviews]);
    };

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Reviews for {movie?.title}</Typography>
            <Grid container spacing={4}> {/* This is the corrected line */}
                <Grid item xs={12} md={4}>
                    <img src={movie?.poster} alt={movie?.title} style={{ width: '100%', borderRadius: '8px' }} />
                </Grid>
                <Grid item xs={12} md={8}>
                    <ReviewForm movieId={movieId!} onReviewAdded={addReview} />
                    <Divider sx={{ my: 3 }} />
                    {reviews.length > 0 ? (
                        reviews.map((r, index) => (
                            <Paper key={index} sx={{ p: 2, mb: 2 }}>
                                <Typography variant="body1">{r.body}</Typography>
                            </Paper>
                        ))
                    ) : (
                        <Typography>No reviews yet. Be the first to add one!</Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ReviewsPage;