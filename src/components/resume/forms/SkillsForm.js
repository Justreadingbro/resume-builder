import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Chip,
  Paper,
  Button,
} from '@mui/material';
import { Add } from '@mui/icons-material';

const SkillsForm = ({ data, onUpdate }) => {
  const [currentSkill, setCurrentSkill] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (currentSkill.trim() && !data.includes(currentSkill.trim())) {
      onUpdate([...data, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    onUpdate(data.filter((skill) => skill !== skillToDelete));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(e);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>

      {/* Skills Input */}
      <form onSubmit={handleAddSkill}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            label="Add a Skill"
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a skill and press Enter or Add button"
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddSkill}
            sx={{ minWidth: '100px' }}
          >
            Add
          </Button>
        </Box>
      </form>

      {/* Skills Display */}
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 2,
          m: 0,
          minHeight: '100px',
          gap: 1,
        }}
        component="ul"
      >
        {data.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => handleDeleteSkill(skill)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Paper>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Click on a skill chip to remove it
      </Typography>
    </Box>
  );
};

export default SkillsForm; 