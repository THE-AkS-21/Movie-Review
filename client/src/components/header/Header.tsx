import React, { useState, useContext } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Box, IconButton,
  Divider, useTheme, useMediaQuery, Drawer, List, ListItem,
  ListItemIcon, ListItemText,
} from '@mui/material';
import { Movie as MovieIcon, Menu as MenuIcon, Home as HomeIcon, Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const { username, logout } = useContext(AuthContext);

  const handleMobileDrawerToggle = () => setMobileDrawerOpen(!mobileDrawerOpen);
  const isActiveRoute = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigationItems = [
    { label: 'Home', path: '/', icon: <HomeIcon /> }
  ];

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
                sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 700 }}
            >
              Movie Reviews
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
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
                        }}
                    >
                      {item.label}
                    </Button>
                ))}

                {/* Desktop Auth UI */}
                <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: 'rgba(255,255,255,0.3)' }} />
                {username ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        Hi, {username}
                      </Typography>
                      <Button color="inherit" variant="outlined" size="small" onClick={handleLogout} startIcon={<LogoutIcon />}>
                        Logout
                      </Button>
                    </Box>
                ) : (
                    <Button color="inherit" variant="outlined" size="small" onClick={() => navigate('/login')} startIcon={<LoginIcon />}>
                      Login / Register
                    </Button>
                )}
              </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
              <IconButton color="inherit" onClick={handleMobileDrawerToggle} sx={{ ml: 2 }}>
                <MenuIcon />
              </IconButton>
          )}
        </Toolbar>

        {/* Mobile Navigation Drawer */}
        <Drawer
            anchor="right"
            open={mobileDrawerOpen}
            onClose={handleMobileDrawerToggle}
            sx={{ '& .MuiDrawer-paper': { width: 280, backgroundColor: theme.palette.background.paper } }}
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
                        borderRadius: 1, mb: 0.5,
                        backgroundColor: isActiveRoute(item.path) ? 'primary.light' : 'transparent',
                        color: isActiveRoute(item.path) ? 'primary.contrastText' : 'text.primary',
                      }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} />
                  </ListItem>
              ))}

              <Divider sx={{ my: 2 }} />

              {/* Mobile Auth UI */}
              {username ? (
                  <>
                    <Typography variant="body2" sx={{ px: 2, mb: 1, color: 'text.secondary' }}>
                      Logged in as {username}
                    </Typography>
                    <ListItem button onClick={handleLogout} sx={{ borderRadius: 1, color: 'error.main' }}>
                      <ListItemIcon sx={{ color: 'inherit' }}><LogoutIcon /></ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </>
              ) : (
                  <ListItem button onClick={() => { handleMobileDrawerToggle(); navigate('/login'); }} sx={{ borderRadius: 1 }}>
                    <ListItemIcon sx={{ color: 'primary.main' }}><LoginIcon /></ListItemIcon>
                    <ListItemText primary="Login / Register" sx={{ color: 'primary.main' }} />
                  </ListItem>
              )}
            </List>
          </Box>
        </Drawer>
      </AppBar>
  );
};

export default Header;