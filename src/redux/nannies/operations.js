// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { database } from '../../components/api/firebase-config';
// import { ref, get } from 'firebase/database';

// export const getListOfNannies = createAsyncThunk(
//   'nanny/list',
//   async (_, thunkApi) => {
//     const dbRef = ref(database, 'nannies');
//     try {
//       const snapshot = await get(dbRef);
//       if (snapshot.exists()) {
//         return snapshot.val();
//       } else {
//         console.log('No data available');
//       }
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

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
        limitToFirst(pageSize)
      );

      if (lastKey) {
        nanniesQuery = query(
          ref(database, 'nannies'),
          orderByKey(),
          startAfter(lastKey),
          limitToFirst(pageSize)
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
  }
);
