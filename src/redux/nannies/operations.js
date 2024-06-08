import { createAsyncThunk } from '@reduxjs/toolkit';
import { database } from '../../components/api/firebase-config';
import { ref, get } from 'firebase/database';

export const getListOfNannies = createAsyncThunk(
  'nanny/list',
  async (_, thunkApi) => {
    const dbRef = ref(database, 'nannies');
    try {
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log('No data available');
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
