import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn, currentUser, logOut } from './operations';

const initialState = {
  error: null,
  isLoading: false,
  isLoggedIn: false,
  isRefreshing: false,
  id: '',
  currentUser: {
    uid: '',
    name: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reduсers: {
    setUser: (state, { payload }) => {
      state.currentUser = payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(signUp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
        state.id = payload.id;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.id = '';
        state.currentUser = {
          id: '',
          name: '',
        };
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isRefreshing = false;
        state.isLoggedIn = payload ? true : false;
        state.currentUser = payload;
      })
      .addCase(currentUser.pending, (state) => {
        state.isRefreshing = true;
      }),
});

export const { setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
