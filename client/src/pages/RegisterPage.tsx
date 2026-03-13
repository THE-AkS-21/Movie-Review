import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, TextField, Button, Typography, Box, Alert, Paper, Link as MuiLink } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { register as registerService } from '../services/authService';

// Form validation schema
const schema = yup.object().shape({
    username: yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters'),
    password: yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
});

type RegisterFormData = yup.InferType<typeof schema>;

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
        try {
            setServerError(null);

            // Register with the global SSO service
            await registerService({ username: data.username, password: data.password });

            setSuccessMessage('Account created successfully! Redirecting to login...');

            // Redirect to login after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error: any) {
            setServerError(error.message || 'Registration failed. Username might already exist.');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8, mb: 8 }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
                <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom>
                    Create an Account
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Join to start reviewing movies
                </Typography>

                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoFocus
                        {...register('username')}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        {...register('confirmPassword')}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />

                    {serverError && (
                        <Alert severity="error" sx={{ mt: 2 }}>{serverError}</Alert>
                    )}
                    {successMessage && (
                        <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                        disabled={isSubmitting || !!successMessage}
                    >
                        {isSubmitting ? 'Creating account...' : 'Sign Up'}
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <MuiLink component={RouterLink} to="/login" variant="body2" sx={{ fontWeight: 600 }}>
                                Sign In
                            </MuiLink>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage;