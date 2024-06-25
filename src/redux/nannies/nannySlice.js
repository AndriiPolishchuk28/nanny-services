import { createSlice, isAnyOf } from '@reduxjs/toolkit';
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

const handlePending = (state) => {
  state.error = null;
  state.isLoading = true;
};

const handleRejected = (state) => {
  state.isLoading = false;
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
      .addCase(getListOfNannies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        if (payload.length > 0) {
          state.nannies = [...state.nannies, ...payload];
          state.lastKey = payload[payload.length - 1].key;
        }
      })
      .addCase(addFavoriteNanny.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.favorites = payload;
      })
      .addMatcher(
        isAnyOf(getListOfNannies.pending, addFavoriteNanny.pending),
        handlePending,
      )
      .addMatcher(
        isAnyOf(getListOfNannies.rejected, addFavoriteNanny.rejected),
        handleRejected,
      );
  },
});

export const { resetNannies, setFilter, clearFavorites, setFavorites } =
  nannySlice.actions;
export const nannyReducer = nannySlice.reducer;
