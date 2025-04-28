import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createResume, updateResume } from '../../store/resumeSlice';
import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import TemplateSelection from './TemplateSelection';
import ResumePreview from './ResumePreview';

const steps = [
  'Personal Info',
  'Experience',
  'Education',
  'Skills',
  'Projects',
  'Template',
  'Preview',
];

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentResume, templates } = useSelector((state) => state.resume);

  const [activeStep, setActiveStep] = useState(0);
  const [resumeData, setResumeData] = useState({
    template: 'modern',
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      website: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    customizations: {
      fontFamily: 'Roboto',
      fontSize: '16px',
      colorScheme: 'blue',
      spacing: 1,
      layout: 'standard',
    },
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const resumeId = searchParams.get('id');
    if (resumeId && currentResume) {
      setResumeData(currentResume);
    }
  }, [location.search, currentResume]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSave = async () => {
    const searchParams = new URLSearchParams(location.search);
    const resumeId = searchParams.get('id');

    if (resumeId) {
      await dispatch(updateResume({ id: resumeId, resumeData }));
    } else {
      await dispatch(createResume(resumeData));
    }
    navigate('/dashboard');
  };

  const handleUpdateData = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onUpdate={(data) => handleUpdateData('personalInfo', data)}
          />
        );
      case 1:
        return (
          <ExperienceForm
            data={resumeData.experience}
            onUpdate={(data) => handleUpdateData('experience', data)}
          />
        );
      case 2:
        return (
          <EducationForm
            data={resumeData.education}
            onUpdate={(data) => handleUpdateData('education', data)}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={resumeData.skills}
            onUpdate={(data) => handleUpdateData('skills', data)}
          />
        );
      case 4:
        return (
          <ProjectsForm
            data={resumeData.projects}
            onUpdate={(data) => handleUpdateData('projects', data)}
          />
        );
      case 5:
        return (
          <TemplateSelection
            selectedTemplate={resumeData.template}
            templates={templates}
            onSelect={(template) => handleUpdateData('template', template)}
          />
        );
      case 6:
        return <ResumePreview data={resumeData} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Build Your Resume
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            {getStepContent(activeStep)}
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Resume
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ResumeBuilder; 