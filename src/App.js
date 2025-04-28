import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './firebase';
import { loginWithGoogle, initializeAuth } from './store/authSlice';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import ResumeBuilder from './components/resume/ResumeBuilder';
import PrivateRoute from './components/routing/PrivateRoute';
import About from './components/pages/About';
import Contact from './components/pages/Contact';

// Create a separate component for the routes
const AppRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  useEffect(() => {
    // Initialize auth state
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    // Check for redirect result when app loads
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          await dispatch(loginWithGoogle());
          navigate('/resume-builder/dashboard');
        }
      } catch (error) {
        console.error('Redirect error:', error);
      }
    };
    
    handleRedirect();
  }, [dispatch, navigate]);

  return (
    <Routes>
      <Route path="/resume-builder" element={<Home />} />
      <Route path="/resume-builder/login" element={<Login />} />
      <Route path="/resume-builder/register" element={<Register />} />
      <Route path="/resume-builder/about" element={<About />} />
      <Route path="/resume-builder/contact" element={<Contact />} />
      <Route
        path="/resume-builder/dashboard"
        element={<PrivateRoute component={Dashboard} />}
      />
      <Route
        path="/resume-builder/build-resume"
        element={<PrivateRoute component={ResumeBuilder} />}
      />
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

function App() {
  const darkMode = useSelector(state => state.theme.darkMode);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename="/resume-builder">
        <div className="App">
          <Navbar />
          <AppRoutes />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
