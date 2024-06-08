import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../../components/api/firebase-config';

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
      //   console.log(user);
      return {
        name: user.displayName,
        email: user.email,
        id: user.uid,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('nanny/logout', async (_, thunkApi) => {
  try {
    await signOut(auth);
    return;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

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
