import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
} from '@mui/material';

const PersonalInfoForm = ({ data, onUpdate }) => {
  const handleChange = (e) => {
    onUpdate({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Full Name"
            name="name"
            value={data.name}
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
            value={data.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={data.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="LinkedIn Profile"
            name="linkedin"
            value={data.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="GitHub Profile"
            name="github"
            value={data.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Personal Website"
            name="website"
            value={data.website}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Professional Summary"
            name="summary"
            value={data.summary}
            onChange={handleChange}
            placeholder="Write a brief professional summary highlighting your key strengths and career objectives..."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PersonalInfoForm; 