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

const EducationForm = ({ data, onUpdate }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [currentEducation, setCurrentEducation] = useState({
    degree: '',
    school: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (e) => {
    setCurrentEducation({
      ...currentEducation,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = [...data];
    if (editIndex >= 0) {
      newData[editIndex] = currentEducation;
    } else {
      newData.push(currentEducation);
    }
    onUpdate(newData);
    resetForm();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setCurrentEducation(data[index]);
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onUpdate(newData);
  };

  const resetForm = () => {
    setEditIndex(-1);
    setCurrentEducation({
      degree: '',
      school: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>

      {/* Education List */}
      {data.map((education, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">{education.degree}</Typography>
                <Typography variant="subtitle1">{education.school}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {education.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {education.startDate} - {education.endDate}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {education.description}
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

      {/* Education Form */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Degree/Certificate"
                  name="degree"
                  value={currentEducation.degree}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="School/Institution"
                  name="school"
                  value={currentEducation.school}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={currentEducation.location}
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
                  value={currentEducation.startDate}
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
                  value={currentEducation.endDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={currentEducation.description}
                  onChange={handleChange}
                  placeholder="Describe your academic achievements, relevant coursework, etc..."
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={editIndex >= 0 ? <Edit /> : <Add />}
                >
                  {editIndex >= 0 ? 'Update Education' : 'Add Education'}
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

export default EducationForm; 