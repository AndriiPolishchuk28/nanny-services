import { createSlice } from '@reduxjs/toolkit';
import { getListOfNannies, signUp, signIn } from './operations';

const initialState = {
  nanny: [],
  favorites: [],
  error: null,
  isLoading: false,
};

const nannySlice = createSlice({
  name: 'nanny',
  initialState,
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
      }),
});

export const nannyReducer = nannySlice.reducer;
