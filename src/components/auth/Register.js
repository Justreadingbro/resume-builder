import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { register, loginWithGoogle, clearError } from '../../store/authSlice';
import GoogleIcon from '@mui/icons-material/Google';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const validateForm = () => {
    const errors = {};
    if (formData.password !== formData.password2) {
      errors.password2 = 'Passwords do not match';
    }
    if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { name, email, password } = formData;
      dispatch(register({ name, email, password }));
    }
  };

  const handleGoogleSignUp = async () => {
    dispatch(clearError());
    const result = await dispatch(loginWithGoogle());
    if (result?.error) {
      console.error('Sign up error:', result.error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Sign Up
          </Typography>
          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Confirm Password"
              type="password"
              id="password2"
              autoComplete="new-password"
              value={formData.password2}
              onChange={handleChange}
              error={!!formErrors.password2}
              helperText={formErrors.password2}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignUp}
              disabled={loading}
              sx={{ mb: 2 }}
            >
              Sign up with Google
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Typography variant="body2" color="primary">
                    {"Already have an account? Sign In"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 