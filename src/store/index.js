import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from './authSlice';
import resumeReducer from './resumeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    resume: resumeReducer,
  },
}); 