import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth } from '../../components/api/firebase-config';
import { database } from '../../components/api/firebase-config';
import { ref, get, set } from 'firebase/database';
import { setFavorites } from '../nannies/nannySlice';
import { errorToast, successToast } from '../../helpers/toast';

export const signUp = createAsyncThunk(
  'nanny/register',

  async (data, thunkApi) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: data.name,
      });

      await set(ref(database, 'users/' + user.uid), {
        name: data.name,
        email: data.email,
        favorites: [],
      });
      successToast('Registration is successful please log in');
      return {
        userName: user.displayName,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

export const signIn = createAsyncThunk(
  'nanny/login',
  async (data, thunkApi) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = userCredential.user;
      const query = ref(database, `users/${user.uid}/favorites`);
      const snapshot = await get(query);
      let favorites = [];
      if (snapshot.exists()) {
        favorites = snapshot.val();
      }
      thunkApi.dispatch(setFavorites(favorites));

      return {
        name: user.displayName,
        email: user.email,
        id: user.uid,
        favorites,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
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
              resolve(user);
            } else {
              resolve(null);
            }
          },
          reject,
        );
      });

      if (user) {
        return {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        };
      } else {
        errorToast('Please login');
        return null;
      }
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
);
