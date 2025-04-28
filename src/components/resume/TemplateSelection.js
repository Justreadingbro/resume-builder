import React from 'react';
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Radio,
  FormControlLabel,
} from '@mui/material';

const TemplateSelection = ({ selectedTemplate, templates, onSelect }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Choose a Template
      </Typography>
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={3} key={template.id}>
            <Card>
              <CardActionArea onClick={() => onSelect(template.id)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={template.preview}
                  alt={template.name}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography variant="h6">{template.name}</Typography>
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedTemplate === template.id}
                          onChange={() => onSelect(template.id)}
                        />
                      }
                      label=""
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {template.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TemplateSelection; 