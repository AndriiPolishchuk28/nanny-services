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
  reducers: {
    resetNannies(state) {
      (state.nannies = []), (state.lastKey = null);
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
          // const uniqueKeys = state.nannies.map((item) => item.key);
          // const nanny = payload.filter(
          //   (item) => !uniqueKeys.includes(item.key)
          // );
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
