import { createSlice } from '@reduxjs/toolkit';
import { getListOfNannies } from './operations';

const initialState = {
  nannies: [],
  favorites: [],
  lastKey: null,
  error: null,
  isLoading: false,
  pageSize: 3,
};

const nannySlice = createSlice({
  name: 'nanny',
  initialState,
  reducers: {
    resetNannies(state) {
      state.nannies = [];
      state.lastKey = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListOfNannies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListOfNannies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.length > 0) {
          state.nannies = [...state.nannies, ...payload];
          state.lastKey = payload[payload.length - 1].key;
        }
      })
      .addCase(getListOfNannies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { resetNannies } = nannySlice.actions;
export const nannyReducer = nannySlice.reducer;
