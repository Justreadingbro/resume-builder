import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Description } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

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
          to="/resume-builder"
          sx={{ mr: 2 }}
        >
          <Description />
        </IconButton>
        <Typography variant="h6" component={RouterLink} to="/resume-builder" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Resume Builder
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button color="inherit" component={RouterLink} to="/resume-builder/about">
            About
          </Button>
          <Button color="inherit" component={RouterLink} to="/resume-builder/contact">
            Contact
          </Button>

          {isAuthenticated ? (
            <>
              <Button color="inherit" component={RouterLink} to="/resume-builder/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/resume-builder/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/resume-builder/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 