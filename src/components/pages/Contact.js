import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Send,
} from '@mui/icons-material';

const contactInfo = [
  {
    icon: <Email sx={{ fontSize: 40 }} />,
    title: 'Email',
    content: 'support@resumebuilder.com',
  },
  {
    icon: <Phone sx={{ fontSize: 40 }} />,
    title: 'Phone',
    content: '+1 (555) 123-4567',
  },
  {
    icon: <LocationOn sx={{ fontSize: 40 }} />,
    title: 'Address',
    content: '123 Resume Street, Builder City, RB 12345',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSnackbar({
      open: true,
      message: 'Message sent successfully!',
      severity: 'success',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container>
      <Box sx={{ py: 8 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Have questions? We'd love to hear from you.
          </Typography>
        </Box>

        {/* Contact Information Cards */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>{info.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {info.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {info.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Contact Form */}
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
              Send us a Message
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<Send />}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Contact; 