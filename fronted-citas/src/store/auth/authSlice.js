import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  updateUserSuccess,
} = authSlice.actions;

export default authSlice.reducer;
