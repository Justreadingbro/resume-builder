import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const ExperienceForm = ({ data, onUpdate }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [currentExperience, setCurrentExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (e) => {
    setCurrentExperience({
      ...currentExperience,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = [...data];
    if (editIndex >= 0) {
      newData[editIndex] = currentExperience;
    } else {
      newData.push(currentExperience);
    }
    onUpdate(newData);
    resetForm();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setCurrentExperience(data[index]);
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onUpdate(newData);
  };

  const resetForm = () => {
    setEditIndex(-1);
    setCurrentExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>

      {/* Experience List */}
      {data.map((experience, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">{experience.title}</Typography>
                <Typography variant="subtitle1">{experience.company}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {experience.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {experience.startDate} - {experience.endDate}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {experience.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <IconButton onClick={() => handleEdit(index)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(index)} color="error">
              <Delete />
            </IconButton>
          </CardActions>
        </Card>
      ))}

      {/* Experience Form */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Job Title"
                  name="title"
                  value={currentExperience.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Company"
                  name="company"
                  value={currentExperience.company}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={currentExperience.location}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  type="month"
                  value={currentExperience.startDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="month"
                  value={currentExperience.endDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Job Description"
                  name="description"
                  value={currentExperience.description}
                  onChange={handleChange}
                  placeholder="Describe your responsibilities and achievements..."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={editIndex >= 0 ? <Edit /> : <Add />}
                >
                  {editIndex >= 0 ? 'Update Experience' : 'Add Experience'}
                </Button>
                {editIndex >= 0 && (
                  <Button
                    sx={{ ml: 2 }}
                    onClick={resetForm}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ExperienceForm; 