import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCAAfmD3bQJTcgQpHkW3uR1cgQwzcq8Y7c',
  authDomain: 'nannies-a4e76.firebaseapp.com',
  projectId: 'nannies-a4e76',
  storageBucket: 'nannies-a4e76.appspot.com',
  messagingSenderId: '162107724345',
  appId: '1:162107724345:web:46a5ad5ffee135a496f3e8',
  measurementId: 'G-PYKGD86H74',
  databaseURL:
    'https://nannies-a4e76-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
