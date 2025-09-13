import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Reviews as ReviewsIcon,
} from '@mui/icons-material';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      handleProfileMenuClose();
    }
  };

  const handleMobileDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Reviews', path: '/reviews', icon: <ReviewsIcon /> },
  ];

  const renderDesktopNavigation = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          component={NavLink}
          to={item.path}
          startIcon={item.icon}
          sx={{
            fontWeight: isActiveRoute(item.path) ? 600 : 400,
            backgroundColor: isActiveRoute(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );

  const renderMobileNavigation = () => (
    <Drawer
      anchor="right"
      open={mobileDrawerOpen}
      onClose={handleMobileDrawerToggle}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <MovieIcon sx={{ mr: 1, color: 'primary.main' }} />
          Movie Reviews
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <List>
          {navigationItems.map((item) => (
            <ListItem
              key={item.path}
              button
              component={NavLink}
              to={item.path}
              onClick={handleMobileDrawerToggle}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                backgroundColor: isActiveRoute(item.path) ? 'primary.light' : 'transparent',
                color: isActiveRoute(item.path) ? 'primary.contrastText' : 'text.primary',
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 2 }} />
        
        {isAuthenticated ? (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1 }}>
              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                {user?.username?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle2">{user?.username}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              disabled={isLoading}
            >
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            fullWidth
            variant="contained"
            startIcon={<LoginIcon />}
            component={NavLink}
            to="/login"
            onClick={handleMobileDrawerToggle}
          >
            Login
          </Button>
        )}
      </Box>
    </Drawer>
  );

  return (
    <AppBar position="sticky" elevation={1}>
      <Toolbar>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <MovieIcon sx={{ mr: 2, fontSize: 32 }} />
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            Movie Reviews
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && renderDesktopNavigation()}

        {/* Desktop Auth Section */}
        {!isMobile && (
          <Box sx={{ ml: 2 }}>
            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  Welcome, {user?.username}
                </Typography>
                <IconButton
                  size="small"
                  onClick={handleProfileMenuOpen}
                  sx={{ color: 'inherit' }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                    {user?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem onClick={handleLogout} disabled={isLoading}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                color="inherit"
                component={NavLink}
                to="/login"
                startIcon={<LoginIcon />}
                variant="outlined"
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.8)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            color="inherit"
            onClick={handleMobileDrawerToggle}
            sx={{ ml: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      {/* Mobile Navigation Drawer */}
      {renderMobileNavigation()}
    </AppBar>
  );
};

export default Header;