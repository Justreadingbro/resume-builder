import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createResume = createAsyncThunk(
  'resume/create',
  async (resumeData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/resumes', resumeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getResumes = createAsyncThunk(
  'resume/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/resumes');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateResume = createAsyncThunk(
  'resume/update',
  async ({ id, resumeData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/resumes/${id}`, resumeData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteResume = createAsyncThunk(
  'resume/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/resumes/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  resumes: [],
  currentResume: null,
  loading: false,
  error: null,
  templates: [
    {
      id: 'modern',
      name: 'Modern',
      description: 'A clean and professional template with a modern design',
      preview: '/templates/modern.png'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Stand out with this creative and unique template',
      preview: '/templates/creative.png'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'A simple and elegant template that focuses on content',
      preview: '/templates/minimal.png'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Traditional template perfect for corporate environments',
      preview: '/templates/professional.png'
    }
  ]
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setCurrentResume: (state, action) => {
      state.currentResume = action.payload;
    },
    clearCurrentResume: (state) => {
      state.currentResume = null;
    },
    updateCurrentResume: (state, action) => {
      state.currentResume = { ...state.currentResume, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(createResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes.push(action.payload);
        state.currentResume = action.payload;
      })
      .addCase(createResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      })
      .addCase(getResumes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getResumes.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = action.payload;
      })
      .addCase(getResumes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      })
      .addCase(updateResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = state.resumes.map(resume =>
          resume._id === action.payload._id ? action.payload : resume
        );
        state.currentResume = action.payload;
      })
      .addCase(updateResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      })
      .addCase(deleteResume.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteResume.fulfilled, (state, action) => {
        state.loading = false;
        state.resumes = state.resumes.filter(resume => resume._id !== action.payload);
        if (state.currentResume && state.currentResume._id === action.payload) {
          state.currentResume = null;
        }
      })
      .addCase(deleteResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  }
});

export const { setCurrentResume, clearCurrentResume, updateCurrentResume } = resumeSlice.actions;

export default resumeSlice.reducer; 