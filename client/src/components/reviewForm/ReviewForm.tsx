// src/components/reviewForm/ReviewForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Box, Typography } from '@mui/material';
import { Review } from '../../types';

interface ReviewFormProps {
    movieId: string;
    onReviewAdded: (review: Review) => void;
}

interface ReviewFormData {
    reviewBody: string;
}

const schema = yup.object().shape({
    reviewBody: yup.string().required('Review cannot be empty').min(10, 'Review must be at least 10 characters'),
});

const ReviewForm: React.FC<ReviewFormProps> = ({ movieId, onReviewAdded }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ReviewFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
        // In a real app, you would post this to your API
        // await api.post('/api/v1/reviews', { reviewBody: data.reviewBody, imdbId: movieId });

        // For now, we just update the local state
        onReviewAdded({ body: data.reviewBody });
        reset(); // Clear the form after submission
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Typography variant="h6" gutterBottom>Write a Review</Typography>
            <TextField
                label="Your Review"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                {...register('reviewBody')}
                error={!!errors.reviewBody}
                helperText={errors.reviewBody?.message}
                sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
                Submit Review
            </Button>
        </Box>
    );
};

export default ReviewForm;