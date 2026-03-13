import React, { useState, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField, Button, Box, Typography, Card, CardContent,
  Rating, Alert, CircularProgress, Chip, useTheme,
} from '@mui/material';
import { Send as SendIcon, RateReview as ReviewIcon, Lock as LockIcon } from '@mui/icons-material';
import { Review, ReviewFormData } from '../../types';
import api from '../../api/axiosConfig';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ReviewFormProps {
  movieId: string;
  onReviewAdded: (review: Review) => void;
}

const schema = yup.object().shape({
  body: yup
      .string()
      .required('Review cannot be empty')
      .min(10, 'Review must be at least 10 characters')
      .max(1000, 'Review must be less than 1000 characters'),
  rating: yup
      .number()
      .min(1, 'Please provide a rating')
      .max(5, 'Rating cannot exceed 5 stars')
      .required('Rating is required'),
});

const ReviewForm: React.FC<ReviewFormProps> = ({ movieId, onReviewAdded }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { username } = useContext(AuthContext); // Get auth state

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<ReviewFormData>({
    resolver: yupResolver(schema),
    defaultValues: { body: '', rating: 0, movieId: movieId },
  });

  const watchedRating = watch('rating');

  // If user is not logged in, show the login prompt instead of the form
  if (!username) {
    return (
        <Card sx={{ mb: 3, backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
          <CardContent sx={{ textAlign: 'center', py: 5 }}>
            <LockIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Want to review this movie?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Join our community to share your thoughts and ratings.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/login')} size="large">
              Login / Register
            </Button>
          </CardContent>
        </Card>
    );
  }

  const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      const response = await api.post('/reviews', {
        reviewBody: data.body,
        imdbId: movieId,
        rating: data.rating,
      });

      const responseData = response.data.data || response.data;

      const newReview: Review = {
        id: responseData.id || Date.now().toString(),
        body: data.body,
        rating: data.rating,
        movieId: movieId,
        username: responseData.username || username,
        createdAt: new Date().toISOString(),
      };

      onReviewAdded(newReview);
      reset();
      setSubmitSuccess(true);

      setTimeout(() => setSubmitSuccess(false), 3000);

    } catch (error: any) {
      console.error('Review submission error:', error);
      setSubmitError(
          error.response?.data?.message ||
          error.message ||
          'Failed to submit review. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (event: React.SyntheticEvent, newValue: number | null) => {
    setValue('rating', newValue || 0, { shouldValidate: true });
  };

  const getRatingText = (rating: number) => {
    const ratingTexts = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Very Good', 5: 'Excellent' };
    return ratingTexts[rating as keyof typeof ratingTexts] || '';
  };

  return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <ReviewIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h3">
              Write a Review
            </Typography>
          </Box>

          {submitSuccess && <Alert severity="success" sx={{ mb: 2 }}>Your review has been submitted successfully!</Alert>}
          {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Rating Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>Your Rating *</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Rating
                    value={watchedRating}
                    onChange={handleRatingChange}
                    size="large"
                    precision={0.5}
                    sx={{ '& .MuiRating-iconFilled': { color: theme.palette.warning.main } }}
                />
                {watchedRating > 0 && <Chip label={getRatingText(watchedRating)} color="primary" variant="outlined" size="small" />}
              </Box>
              {errors.rating && <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>{errors.rating.message}</Typography>}
            </Box>

            {/* Review Text */}
            <TextField
                label="Your Review"
                multiline rows={4} fullWidth variant="outlined"
                placeholder="Share your thoughts about this movie..."
                {...register('body')}
                error={!!errors.body}
                helperText={errors.body?.message || `${watch('body')?.length || 0}/1000 characters`}
                sx={{ mb: 3 }}
                disabled={isSubmitting}
            />

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                  type="submit" variant="contained"
                  startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                  disabled={isSubmitting || !watchedRating || !watch('body')?.trim()}
                  sx={{ px: 3, py: 1.5, fontSize: '1rem', fontWeight: 600, minWidth: 140 }}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
  );
};

export default ReviewForm;