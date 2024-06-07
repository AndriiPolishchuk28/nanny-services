import { createSlice } from '@reduxjs/toolkit';
import { getListOfNannies, signUp, signIn, currentUser } from './operations';

const initialState = {
  nanny: [],
  favorites: [],
  error: null,
  isLoading: false,
  currentUser: null,
};

const nannySlice = createSlice({
  name: 'nanny',
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
      .addCase(getListOfNannies.fulfilled, (state, { payload }) => {
        (state.isLoading = false), (state.nanny = payload);
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        (state.isLoading = false), console.log(payload);
      })
      .addCase(currentUser.fulfilled, (state, { payload }) => {
        (state.isLoading = false), (state.currentUser = payload);
      }),
});

export const { setUser } = nannySlice.actions;

export const nannyReducer = nannySlice.reducer;
