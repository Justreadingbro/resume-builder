import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  Description,
  Edit,
  Download,
  Style,
} from '@mui/icons-material';

const features = [
  {
    icon: <Description sx={{ fontSize: 40 }} />,
    title: 'Multiple Templates',
    description: 'Choose from a variety of professional templates to make your resume stand out.',
  },
  {
    icon: <Edit sx={{ fontSize: 40 }} />,
    title: 'Easy to Customize',
    description: 'Customize every aspect of your resume with our intuitive editor.',
  },
  {
    icon: <Download sx={{ fontSize: 40 }} />,
    title: 'Export Options',
    description: 'Download your resume in multiple formats including PDF, Word, and more.',
  },
  {
    icon: <Style sx={{ fontSize: 40 }} />,
    title: 'Professional Designs',
    description: 'Get access to professionally designed templates for any industry.',
  },
];

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Create Your Professional Resume
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Build beautiful, professional resumes in minutes with our easy-to-use builder
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{ mt: 4 }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid key={index} sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 2,
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Templates Preview Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Professional Templates
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {['modern', 'creative', 'minimal', 'professional'].map((template) => (
              <Grid key={template} sx={{ width: { xs: '100%', sm: '50%', md: '25%' } }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`/templates/${template}.png`}
                    alt={`${template} template`}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h3" textTransform="capitalize">
                      {template}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ bgcolor: 'secondary.main', color: 'white', py: 8, textAlign: 'center' }}>
        <Container>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Build Your Professional Resume?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/register"
            sx={{ mt: 4 }}
          >
            Start Building Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 