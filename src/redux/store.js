import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { nannyReducer } from './nannies/nannySlice';
import { authReducer } from './auth/authSlice';

const nannyConfig = {
  key: 'nanny',
  storage,
  whitelist: ['favorites'],
};

const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['id'],
};

export const store = configureStore({
  reducer: {
    nanny: persistReducer(nannyConfig, nannyReducer),
    auth: persistReducer(authConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
