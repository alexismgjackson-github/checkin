import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase.js";
import Layout from "../components/Layout/Layout.jsx";
import Login from "../pages/Login.jsx";
import CreateAccount from "../pages/CreateAccount.jsx";
import Home from "../pages/Home.jsx";

// https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js
// https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js
// https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js

export default function App() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [emailMessage, setEmailMessage] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");

  const createUserCredientials = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(`${user} successfully created an account`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} : ${errorMessage}`);
        console.log(`User's account creation failed`);
      });
  };

  const logInWithUserCredientials = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(`${user} successfully logged in`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} : ${errorMessage}`);
        console.log(`User's log-in credientials failed`);
      });
  };

  function logOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful
      })
      .catch((error) => {
        console.error(error.message);
        // An error happened
      });
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Login
                  signInWithUserCredientials={logInWithUserCredientials}
                  email={email}
                  password={password}
                  emailMessage={emailMessage}
                  passwordMessage={passwordMessage}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setEmailMessage={setEmailMessage}
                  setPasswordMessage={setPasswordMessage}
                />
              }
            />
            <Route
              path="/account"
              element={
                <CreateAccount
                  createUserCredientials={createUserCredientials}
                  email={email}
                  password={password}
                  emailMessage={emailMessage}
                  passwordMessage={passwordMessage}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setEmailMessage={setEmailMessage}
                  setPasswordMessage={setPasswordMessage}
                />
              }
            />
            <Route path="/home" element={<Home logOut={logOut} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
