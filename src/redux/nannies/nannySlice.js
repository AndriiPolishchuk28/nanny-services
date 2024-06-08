import { createSlice } from '@reduxjs/toolkit';
import { getListOfNannies } from './operations';

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
    builder.addCase(getListOfNannies.fulfilled, (state, { payload }) => {
      (state.isLoading = false), (state.nanny = payload);
    }),
});

export const { setUser } = nannySlice.actions;

export const nannyReducer = nannySlice.reducer;
