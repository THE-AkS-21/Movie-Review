import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Home as HomeIcon,
  Movie as MovieIcon,
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const quickActions = [
    {
      label: 'Browse Movies',
      icon: <MovieIcon />,
      action: () => navigate('/'),
      description: 'Discover our collection of movies',
    },
    {
      label: 'Search',
      icon: <SearchIcon />,
      action: () => navigate('/'),
      description: 'Find specific movies or reviews',
    },
  ];

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          py: 4,
        }}
      >
        {/* 404 Illustration */}
        <Box
          sx={{
            position: 'relative',
            mb: 4,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -20,
              left: -20,
              right: -20,
              bottom: -20,
              background: `linear-gradient(45deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
              borderRadius: '50%',
              zIndex: -1,
            },
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '4rem', md: '6rem' },
              fontWeight: 900,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
          >
            404
          </Typography>
        </Box>

        {/* Error Message */}
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, mb: 2 }}
        >
          Oops! Page Not Found
        </Typography>
        
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 4,
            maxWidth: 500,
            lineHeight: 1.6,
          }}
        >
          The page you're looking for seems to have vanished into the digital void. 
          Don't worry, even the best movies have plot twists!
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            mb: 4,
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' },
          }}
        >
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
            size="large"
            sx={{
              px: 3,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
            }}
          >
            Go Home
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            size="large"
            sx={{
              px: 3,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
            }}
          >
            Go Back
          </Button>
        </Box>

        {/* Quick Actions */}
        <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
          Quick Actions
        </Typography>
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
            width: '100%',
            maxWidth: 600,
          }}
        >
          {quickActions.map((action, index) => (
            <Card
              key={index}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4],
                },
              }}
              onClick={action.action}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box
                  sx={{
                    color: 'primary.main',
                    mb: 1,
                    '& .MuiSvgIcon-root': {
                      fontSize: '2rem',
                    },
                  }}
                >
                  {action.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {action.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {action.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Help Text */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 4, fontStyle: 'italic' }}
        >
          If you believe this is an error, please contact support or try refreshing the page.
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFoundPage;