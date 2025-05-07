// Import React hook for state management
import { useState } from "react";

// Import the LoginCard component that handles the login UI and logic
import LoginCard from "../components/Login/LoginCard";

// Login component that manages login form state and passes props to LoginCard
export default function Login({
  signInWithEmailAndPassword, // Firebase method for email/password login
  signInWithPopup, // Firebase method for third-party login (e.g., Google)
  GoogleAuthProvider, // Firebase Google auth provider
  auth, // Firebase auth instance
  email, // User email (controlled input)
  password, // User password (controlled input)
  setEmail, // Setter for email
  setPassword, // Setter for password
}) {
  // Holds login error message (e.g., incorrect email/password)
  const [loginMessage, setLoginMessage] = useState("");

  // Holds error message from Google sign-in attempts
  const [googleLoginMessage, setGoogleLoginMessage] = useState("");

  // Tracks whether the password should be visible in the input field
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Toggles the visibility of the password input
  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  return (
    <>
      {/* LoginCard component handles user interaction and displays the form */}
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
