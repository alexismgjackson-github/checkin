import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  signInWithEmailAndPassword, // signs in a user using their email address and password.
  createUserWithEmailAndPassword, // creates a new user account with an email address and password.
  onAuthStateChanged, //  monitors changes in the authentication state of the user (logs in, logs out, etc)s
  GoogleAuthProvider, // enables Google sign-in for your app
  signInWithPopup, // method used to sign in a user using a popup window (third-party like Google)
} from "firebase/auth";
import { db } from "../config/firebase.js";
import {
  collection,
  addDoc
} from "firebase/firestore";
import { auth } from "../config/firebase.js";
import Layout from "../components/Layout/Layout.jsx";
import Login from "../pages/Login.jsx";
import CreateAccount from "../pages/CreateAccount.jsx";
import Home from "../pages/Home.jsx";

export default function App() {
  // state for user's email input

  const [email, setEmail] = useState("");

  // state for user's password input

  const [password, setPassword] = useState("");

  // state for if account creation was successful or not

  const [isSuccessful, setIsSuccessful] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
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
