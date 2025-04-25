import { useState } from "react";
import LoginCard from "../components/Login/LoginCard";
import "./Login.css";

export default function Login({
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  auth,
  email,
  password,
  setEmail,
  setPassword,
}) {
  // state for displaying messages to the user (login error)

  const [loginMessage, setLoginMessage] = useState("");

  // state for displaying messages to the user (google sign in login errors)

  const [googleLoginMessage, setGoogleLoginMessage] = useState("");

  // state determines whether the password is visible in the form

  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // toggle function to flip showLoginPassword between true and false

  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  return (
    <>
      <LoginCard
        signInWithEmailAndPassword={signInWithEmailAndPassword}
        signInWithPopup={signInWithPopup}
        GoogleAuthProvider={GoogleAuthProvider}
        auth={auth}
        email={email}
        password={password}
        loginMessage={loginMessage}
        googleLoginMessage={googleLoginMessage}
        setEmail={setEmail}
        setPassword={setPassword}
        setLoginMessage={setLoginMessage}
        setGoogleLoginMessage={setGoogleLoginMessage}
        toggleLoginPasswordVisibility={toggleLoginPasswordVisibility}
        showLoginPassword={showLoginPassword}
      />
    </>
  );
}
