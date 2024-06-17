import { createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../components/api/firebase-config';
import {
  ref,
  get,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
} from 'firebase/database';

export const getListOfNannies = createAsyncThunk(
  'nanny/list',
  async ({ lastKey, pageSize }, thunkApi) => {
    try {
      let nanniesQuery = query(
        ref(database, 'nannies'),
        orderByKey(),
        limitToFirst(pageSize),
      );

      if (lastKey) {
        nanniesQuery = query(
          ref(database, 'nannies'),
          limitToFirst(pageSize),
          orderByKey(),
          startAfter(lastKey),
        );
      }

      const snapshot = await get(nanniesQuery);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const nanniesArray = Object.entries(data).map(([key, value]) => ({
          key,
          ...value,
        }));
        return nanniesArray;
      } else {
        console.log('No data available');
        return [];
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
