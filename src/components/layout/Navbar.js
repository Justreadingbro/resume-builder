import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  Description,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/themeSlice';
import { logout } from '../../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          component={RouterLink}
          to="/"
          sx={{ mr: 2 }}
        >
          <Description />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Resume Builder
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
          <Button color="inherit" component={RouterLink} to="/contact">
            Contact
          </Button>

          {isAuthenticated ? (
            <>
              <Button color="inherit" component={RouterLink} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={RouterLink} to="/build-resume">
                Build Resume
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/register">
                Register
              </Button>
            </>
          )}

          <IconButton color="inherit" onClick={handleThemeToggle}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 