import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { Add, Edit, Delete, Download } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getResumes, deleteResume } from '../../store/resumeSlice';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { resumes, loading } = useSelector((state) => state.resume);

  useEffect(() => {
    dispatch(getResumes());
  }, [dispatch]);

  const handleCreateNew = () => {
    navigate('/build-resume');
  };

  const handleEdit = (id) => {
    navigate(`/build-resume?id=${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      dispatch(deleteResume(id));
    }
  };

  const handleDownload = (id) => {
    window.open(`/api/resumes/${id}/export/pdf`, '_blank');
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          My Resumes
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateNew}
        >
          Create New Resume
        </Button>
      </Box>

      <Grid container spacing={3}>
        {resumes.length === 0 ? (
          <Grid item xs={12}>
            <Card sx={{ textAlign: 'center', py: 4 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  No resumes yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click the button above to create your first resume
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          resumes.map((resume) => (
            <Grid item xs={12} sm={6} md={4} key={resume._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {resume.personalInfo.name || 'Untitled Resume'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Template: {resume.template}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Last Updated:{' '}
                    {new Date(resume.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEdit(resume._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Download />}
                    onClick={() => handleDownload(resume._id)}
                  >
                    Download
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(resume._id)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard; 