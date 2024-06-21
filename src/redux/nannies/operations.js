import { createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../components/api/firebase-config';
import {
  ref,
  get,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
  set,
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

export const addFavoriteNanny = createAsyncThunk(
  'add/favorite',
  async ({ id, nanny }, thunkApi) => {
    try {
      const query = ref(database, 'users');
      const snapshot = await get(query);

      if (snapshot.exists()) {
        const data = snapshot.val()[id];
        if (data.hasOwnProperty('favorites')) {
          const exists = data.favorites.some((item) => item.key === nanny.key);

          if (exists) {
            data.favorites = data.favorites.filter(
              (item) => item.key !== nanny.key,
            );
          } else {
            data.favorites = [...data.favorites, nanny];
          }
        } else {
          data.favorites = [nanny];
        }
        await set(ref(database, `users/${id}`), data);
        return data.favorites;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
