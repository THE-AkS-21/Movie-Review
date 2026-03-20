import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Container, TextField, Button, Typography, Box, Alert, Paper } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { login as loginService } from '../services/authService';
import { LoginCredentials } from '../types';
import { Link as RouterLink } from 'react-router-dom';

const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const LoginPage: React.FC = () => {
    // Using the new AuthContext instead of the old useAuth hook
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
        try {
            setServerError(null);

            // 1. Authenticate with the global SSO service
            const response = await loginService(data);

            // 2. Save token and username into Context & LocalStorage
            login(response.token, response.username);

            // 3. Redirect back to the movie app
            navigate('/');
        } catch (error: any) {
            setServerError(error.message || 'Invalid username or password');
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 8, mb: 8 }}>
            <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
                <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom>
                    Sign In
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Access your movie review account
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

                    {serverError && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {serverError}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Signing in...' : 'Sign In'}
                    </Button>

                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography variant="body2">
                            Don't have an account?{' '}
                            <Typography
                                component={RouterLink}
                                to="/register"
                                variant="body2"
                                color="primary"
                                sx={{ textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                            >
                                Sign Up
                            </Typography>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;