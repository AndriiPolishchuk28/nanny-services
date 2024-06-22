import { createSlice } from '@reduxjs/toolkit';
import { addFavoriteNanny, getListOfNannies } from './operations';

const initialState = {
  nannies: [],
  favorites: [],
  lastKey: null,
  error: null,
  isLoading: false,
  pageSize: 3,
  filter: '',
};

const nannySlice = createSlice({
  name: 'nanny',
  initialState,
  reducers: {
    resetNannies(state) {
      state.nannies = [];
      state.lastKey = null;
    },
    setFilter(state, { payload }) {
      state.filter = payload;
    },
    clearFavorites(state) {
      state.favorites = [];
    },
    setFavorites(state, { payload }) {
      state.favorites = payload;
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
      })
      .addCase(addFavoriteNanny.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.favorites = payload;
      });
  },
});

export const { resetNannies, setFilter, clearFavorites, setFavorites } =
  nannySlice.actions;
export const nannyReducer = nannySlice.reducer;
