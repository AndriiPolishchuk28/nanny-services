import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn, currentUser, logOut } from './operations';

const initialState = {
  error: null,
  isLoading: false,
  isRefreshing: false,
  currentUser: {
    id: '',
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
      .addCase(signUp.fulfilled, (state, { payload }) => {
        (state.isLoading = false), console.log(payload);
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        (state.isLoading = false), console.log(payload);
        state.currentUser = payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        (state.isLoading = false),
          (state.currentUser = {
            id: '',
            name: '',
          });
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        ((state.isLoading = false), (state.isRefreshing = false)),
          (state.currentUser = payload);
      })
      .addCase(currentUser.pending, (state) => {
        state.isRefreshing = true;
      }),
});

export const { setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
