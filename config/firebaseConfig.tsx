// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhlcXD6FGGIWA-1xucuCCzaKQ9FSt9dgs",
  authDomain: "taller-1-f0e09.firebaseapp.com",
  projectId: "taller-1-f0e09",
  storageBucket: "taller-1-f0e09.firebasestorage.app",
  messagingSenderId: "212142383259",
  appId: "1:212142383259:web:895f13bd95f4325e7d263e",
  databaseURL:"https://taller-1-f0e09-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Realtime Database and get a reference to the service
export const dbRealTime = getDatabase(app);


