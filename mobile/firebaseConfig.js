// Firebase app initialization.
// 1. Create a project at https://console.firebase.google.com
// 2. Enable Email/Password Auth, Cloud Firestore, and Storage
// 3. Replace the placeholder values below with your project's web config.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAzMAtQ09pR2z2ztIyAc7wgXukrX8APhnY',
  authDomain: 'dubida.firebaseapp.com',
  projectId: 'dubida',
  storageBucket: 'dubida.firebasestorage.app',
  messagingSenderId: '334306087453',
  appId: '1:334306087453:web:f49342b087c31b85282cf4',
};

const app = initializeApp(firebaseConfig);

// On native we persist the session with AsyncStorage; on web getAuth() handles it.
export const auth = Platform.OS === 'web' 
  ? getAuth(app) 
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
export const db = getFirestore(app);
export const storage = getStorage(app);
