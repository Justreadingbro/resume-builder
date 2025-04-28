import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
  Link,
  Chip,
  Button,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  GitHub,
  Language,
  GetApp,
} from '@mui/icons-material';

const ModernTemplate = ({ data }) => (
  <Box sx={{ p: 4 }}>
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        {data.personalInfo.name}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
        {data.personalInfo.email && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Email fontSize="small" />
            <Typography>{data.personalInfo.email}</Typography>
          </Box>
        )}
        {data.personalInfo.phone && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Phone fontSize="small" />
            <Typography>{data.personalInfo.phone}</Typography>
          </Box>
        )}
        {data.personalInfo.location && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOn fontSize="small" />
            <Typography>{data.personalInfo.location}</Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        {data.personalInfo.linkedin && (
          <Link
            href={data.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <LinkedIn fontSize="small" />
            LinkedIn
          </Link>
        )}
        {data.personalInfo.github && (
          <Link
            href={data.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <GitHub fontSize="small" />
            GitHub
          </Link>
        )}
        {data.personalInfo.website && (
          <Link
            href={data.personalInfo.website}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <Language fontSize="small" />
            Website
          </Link>
        )}
      </Box>
    </Box>

    {data.summary && (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Professional Summary
        </Typography>
        <Typography>{data.summary}</Typography>
      </Box>
    )}

    {data.experience.length > 0 && (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Experience
        </Typography>
        {data.experience.map((exp, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {exp.title} at {exp.company}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {exp.startDate} - {exp.endDate} | {exp.location}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {exp.description}
            </Typography>
          </Box>
        ))}
      </Box>
    )}

    {data.education.length > 0 && (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Education
        </Typography>
        {data.education.map((edu, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {edu.degree} - {edu.school}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {edu.startDate} - {edu.endDate} | {edu.location}
            </Typography>
            {edu.description && (
              <Typography variant="body1" sx={{ mt: 1 }}>
                {edu.description}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    )}

    {data.skills.length > 0 && (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Skills
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {data.skills.map((skill, index) => (
            <Chip key={index} label={skill} variant="outlined" />
          ))}
        </Box>
      </Box>
    )}

    {data.projects.length > 0 && (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Projects
        </Typography>
        {data.projects.map((project, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {project.name}
            </Typography>
            {project.technologies.length > 0 && (
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
            )}
            <Typography variant="body1">{project.description}</Typography>
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-block', mt: 1 }}
              >
                Project Link
              </Link>
            )}
          </Box>
        ))}
      </Box>
    )}
  </Box>
);

const ResumePreview = ({ data }) => {
  const getTemplateComponent = () => {
    switch (data.template) {
      case 'modern':
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<GetApp />}
          onClick={() => window.print()}
        >
          Download PDF
        </Button>
      </Box>
      <Paper
        elevation={3}
        sx={{
          width: '210mm',
          minHeight: '297mm',
          margin: '0 auto',
          backgroundColor: 'white',
        }}
      >
        {getTemplateComponent()}
      </Paper>
    </Box>
  );
};

export default ResumePreview; 