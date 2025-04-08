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
import { auth } from "../config/firebase.js";
import Layout from "../components/Layout/Layout.jsx";
import Login from "../pages/Login.jsx";
import CreateAccount from "../pages/CreateAccount.jsx";
import Home from "../pages/Home.jsx";

export default function App() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loginMessage, setLoginMessage] = useState("");

  const [createAcctMessage, setCreateAcctMessage] = useState("");

  const [emailMessage, setEmailMessage] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");

  const [isSuccessful, setIsSuccessful] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
                  emailMessage={emailMessage}
                  passwordMessage={passwordMessage}
                  loginMessage={loginMessage}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setLoginMessage={setLoginMessage}
                  setEmailMessage={setEmailMessage}
                  setPasswordMessage={setPasswordMessage}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
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
                  emailMessage={emailMessage}
                  passwordMessage={passwordMessage}
                  createAcctMessage={createAcctMessage}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setCreateAcctMessage={setCreateAcctMessage}
                  setEmailMessage={setEmailMessage}
                  setPasswordMessage={setPasswordMessage}
                  isSuccessful={isSuccessful}
                  setIsSuccessful={setIsSuccessful}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
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
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
