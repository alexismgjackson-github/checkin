// Import core Firebase services used in the app
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration for this web app
const firebaseConfig = {
  apiKey: "AIzaSyDKEpPv1EMmNwucl_QDdKwKaHLnsTMZFa8",
  authDomain: "check-in-7312f.firebaseapp.com",
  projectId: "check-in-7312f",
  storageBucket: "check-in-7312f.firebasestorage.app",
  messagingSenderId: "601541385438",
  appId: "1:601541385438:web:8c8594f220ef1a8a96364f",
  measurementId: "G-FKPML1QZQ6",
};

// Initialize Firebase app instance
export const app = initializeApp(firebaseConfig);

// Set up Firebase Authentication
export const auth = getAuth(app);

// Set up Cloud Firestore and export the database instance
export const db = getFirestore(app);
