import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Create Google provider instance
const googleProvider = new GoogleAuthProvider();

// Initialize auth state listener
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { dispatch }) => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          
          dispatch(setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || userData?.name,
            photoURL: user.photoURL
          }));
        } else {
          dispatch(clearUser());
        }
        resolve();
      });
    });
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        createdAt: new Date().toISOString()
      });

      return { uid: user.uid, email: user.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return { uid: user.uid, email: user.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      // First, try to get the redirect result if we're returning from a redirect
      const result = await getRedirectResult(auth);
      
      // If no redirect result, initiate the redirect
      if (!result) {
        await signInWithRedirect(auth, googleProvider);
        return null; // We'll handle the result in the redirect
      }
      
      const user = result.user;
      
      // Store user data in Firestore if it's a new user
      const userDoc = doc(db, 'users', user.uid);
      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date().toISOString()
      };
      
      await setDoc(userDoc, userData, { merge: true });

      return { 
        uid: user.uid, 
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };
    } catch (error) {
      console.error('Google login error:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Initialize Auth
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state) => {
        state.loading = false;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Google Login
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
          state.isAuthenticated = true;
        }
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setUser, clearUser } = authSlice.actions;

export default authSlice.reducer; 