import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import {
  Description,
  Security,
  Speed,
  Brush,
} from '@mui/icons-material';

const features = [
  {
    icon: <Description sx={{ fontSize: 40 }} />,
    title: 'Professional Templates',
    description:
      'Choose from a variety of professionally designed templates that cater to different industries and career levels.',
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Secure & Private',
    description:
      'Your data is encrypted and stored securely. We never share your information with third parties.',
  },
  {
    icon: <Speed sx={{ fontSize: 40 }} />,
    title: 'Easy to Use',
    description:
      'Our intuitive interface makes it simple to create and edit your resume in minutes.',
  },
  {
    icon: <Brush sx={{ fontSize: 40 }} />,
    title: 'Customizable Design',
    description:
      'Personalize your resume with custom colors, fonts, and layouts to match your style.',
  },
];

const About = () => {
  return (
    <Container>
      <Box sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            About Resume Builder
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            We help professionals create stunning resumes that stand out and get
            noticed by employers.
          </Typography>
        </Box>

        {/* Mission Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to empower job seekers with the tools they need to
            showcase their skills and experience effectively. We believe that
            everyone deserves access to professional-quality resume templates and
            tools that can help them advance their careers.
          </Typography>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom>
            Why Choose Us
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
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
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        width: 60,
                        height: 60,
                        mb: 2,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography gutterBottom variant="h6" component="h3">
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
        </Box>

        {/* Story Section */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" paragraph>
            Resume Builder was founded with a simple goal: to make professional
            resume creation accessible to everyone. We understand the challenges of
            job hunting and the importance of making a great first impression. Our
            team of career experts and designers work together to create templates
            and tools that help you present your best self to potential employers.
          </Typography>
          <Typography variant="body1">
            Today, we're proud to have helped thousands of professionals across
            various industries land their dream jobs. We continue to innovate and
            improve our platform based on user feedback and industry trends to
            ensure you always have access to the best resume building tools
            available.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default About; 