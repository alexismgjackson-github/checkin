// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_CHECKIN_API_KEY,
  authDomain: "watcherv2-11424.firebaseapp.com",
  projectId: "watcherv2-11424",
  storageBucket: "watcherv2-11424.firebasestorage.app",
  messagingSenderId: "954146825785",
  appId: "1:954146825785:web:a6b7e51568637740498fe8",
  measurementId: "G-YZYH7ZBL92",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
