// import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// web app's firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDKEpPv1EMmNwucl_QDdKwKaHLnsTMZFa8",
  authDomain: "check-in-7312f.firebaseapp.com",
  projectId: "check-in-7312f",
  storageBucket: "check-in-7312f.firebasestorage.app",
  messagingSenderId: "601541385438",
  appId: "1:601541385438:web:8c8594f220ef1a8a96364f",
  measurementId: "G-FKPML1QZQ6",
};

// initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// initialize cloud firestore and get a reference to the service

export const db = getFirestore(app);
