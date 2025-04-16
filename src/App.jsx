import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { db } from "../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
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
