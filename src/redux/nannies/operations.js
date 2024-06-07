import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, database } from '../../components/api/firebase-config';
import { ref, get, set } from 'firebase/database';
import { setUser } from './nannySlice';

export const signUp = createAsyncThunk(
  'nanny/register',

  async (data, thunkApi) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: data.name,
      });
      // await set(ref(database, 'users/' + user.uid), {
      //   name: data.name,
      //   email: data.email,
      // });
      return {
        userName: user.displayName,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'nanny/login',
  async (data, thunkApi) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      return {
        user,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const currentUser = createAsyncThunk(
  'nanny/currentUser',
  async (_, thunkApi) => {
    try {
      const user = await new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            unsubscribe();
            if (user) {
              console.log(user);
              resolve(user);
            } else {
              resolve(null);
            }
          },
          reject
        );
      });

      if (user) {
        return {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        };
      } else {
        console.log('Please login');
        return null;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

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
