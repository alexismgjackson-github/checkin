// React and router imports
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

// Firebase authentication imports
import {
  signInWithEmailAndPassword, // Sign in using email/password
  createUserWithEmailAndPassword, // Create new account using email/password
  onAuthStateChanged, // Listen for authentication state changes (login/logout)
  GoogleAuthProvider, // Google auth provider setup
  signInWithPopup, // Sign in with third-party popup (e.g., Google)
  signOut, // Log out the user
} from "firebase/auth";

// Firebase Firestore imports
import { db } from "../config/firebase.js"; // Firestore database instance
import {
  collection, // Reference to a collection in Firestore
  addDoc, // Function to add a document to a Firestore collection
} from "firebase/firestore";

// Firebase auth instance
import { auth } from "../config/firebase.js";

// Component imports
import Layout from "../components/Layout/Layout.jsx";
import Login from "../pages/Login.jsx";
import CreateAccount from "../pages/CreateAccount.jsx";
import Home from "../pages/Home.jsx";

// Main App component
export default function App() {
  // State to track user input for email
  const [email, setEmail] = useState("");

  // State to track user input for password
  const [password, setPassword] = useState("");

  // State to determine if account creation was successful
  const [isSuccessful, setIsSuccessful] = useState(null);

  return (
    <>
      {/* React Router setup with nested routing inside a shared layout */}
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* Login Route */}
            <Route
              path="/"
              element={
                <Login
                  signInWithEmailAndPassword={signInWithEmailAndPassword}
                  signInWithPopup={signInWithPopup}
                  GoogleAuthProvider={GoogleAuthProvider}
                  auth={auth}
                  email={email}
                  password={password}
                  setEmail={setEmail}
                  setPassword={setPassword}
                />
              }
            />

            {/* Create Account Route */}
            <Route
              path="/account"
              element={
                <CreateAccount
                  createUserWithEmailAndPassword={
                    createUserWithEmailAndPassword
                  }
                  auth={auth}
                  email={email}
                  password={password}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  isSuccessful={isSuccessful}
                  setIsSuccessful={setIsSuccessful}
                />
              }
            />

            {/* Home Route (after authentication) */}
            <Route
              path="/home"
              element={
                <Home
                  auth={auth}
                  onAuthStateChanged={onAuthStateChanged}
                  signOut={signOut}
                  db={db}
                  collection={collection}
                  addDoc={addDoc}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
