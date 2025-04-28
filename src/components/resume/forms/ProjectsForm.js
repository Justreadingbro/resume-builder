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
  Chip,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const ProjectsForm = ({ data, onUpdate }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [currentProject, setCurrentProject] = useState({
    name: '',
    description: '',
    technologies: [],
    link: '',
  });
  const [currentTechnology, setCurrentTechnology] = useState('');

  const handleChange = (e) => {
    setCurrentProject({
      ...currentProject,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTechnology = (e) => {
    e.preventDefault();
    if (
      currentTechnology.trim() &&
      !currentProject.technologies.includes(currentTechnology.trim())
    ) {
      setCurrentProject({
        ...currentProject,
        technologies: [...currentProject.technologies, currentTechnology.trim()],
      });
      setCurrentTechnology('');
    }
  };

  const handleDeleteTechnology = (techToDelete) => {
    setCurrentProject({
      ...currentProject,
      technologies: currentProject.technologies.filter(
        (tech) => tech !== techToDelete
      ),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = [...data];
    if (editIndex >= 0) {
      newData[editIndex] = currentProject;
    } else {
      newData.push(currentProject);
    }
    onUpdate(newData);
    resetForm();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setCurrentProject(data[index]);
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onUpdate(newData);
  };

  const resetForm = () => {
    setEditIndex(-1);
    setCurrentProject({
      name: '',
      description: '',
      technologies: [],
      link: '',
    });
    setCurrentTechnology('');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Projects
      </Typography>

      {/* Projects List */}
      {data.map((project, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">{project.name}</Typography>
                <Box sx={{ my: 1 }}>
                  {project.technologies.map((tech, techIndex) => (
                    <Chip
                      key={techIndex}
                      label={tech}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
                <Typography variant="body1">{project.description}</Typography>
                {project.link && (
                  <Typography
                    variant="body2"
                    color="primary"
                    component="a"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ mt: 1, display: 'block' }}
                  >
                    Project Link
                  </Typography>
                )}
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

      {/* Project Form */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Project Name"
                  name="name"
                  value={currentProject.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Project Description"
                  name="description"
                  value={currentProject.description}
                  onChange={handleChange}
                  placeholder="Describe the project, its goals, and your role..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Link"
                  name="link"
                  value={currentProject.link}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Technologies Used
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                      fullWidth
                      label="Add Technology"
                      value={currentTechnology}
                      onChange={(e) => setCurrentTechnology(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTechnology(e);
                        }
                      }}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleAddTechnology}
                      sx={{ minWidth: '100px' }}
                    >
                      Add
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {currentProject.technologies.map((tech, index) => (
                      <Chip
                        key={index}
                        label={tech}
                        onDelete={() => handleDeleteTechnology(tech)}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={editIndex >= 0 ? <Edit /> : <Add />}
                >
                  {editIndex >= 0 ? 'Update Project' : 'Add Project'}
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

export default ProjectsForm; 