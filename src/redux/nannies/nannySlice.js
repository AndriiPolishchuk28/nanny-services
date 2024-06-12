// import { createSlice } from '@reduxjs/toolkit';
// import { getListOfNannies } from './operations';

// const initialState = {
//   nanny: [],
//   favorites: [],
//   error: null,
//   isLoading: false,
//   PAGE_SIZE: 3,
// };

// const nannySlice = createSlice({
//   name: 'nanny',
//   initialState,
//   extraReducers: (builder) =>
//     builder.addCase(getListOfNannies.fulfilled, (state, { payload }) => {
//       (state.isLoading = false), (state.nanny = payload);
//     }),
// });

// export const { setUser } = nannySlice.actions;

// export const nannyReducer = nannySlice.reducer;

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListOfNannies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getListOfNannies.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.nannies = [...state.nannies, ...payload];
        state.lastKey = payload[payload.length - 1].key;
      })
      .addCase(getListOfNannies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const nannyReducer = nannySlice.reducer;
