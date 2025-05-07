import { useState } from "react";
import CreateAccountCard from "../components/CreateAccount/CreateAccountCard";

// Component responsible for rendering and managing the create account form
export default function CreateAccount({
  createUserWithEmailAndPassword, // Firebase method to create a new user
  auth, // Firebase authentication instance
  email, // Controlled input value for email
  password, // Controlled input value for password
  setEmail, // Setter function for email input
  setPassword, // Setter function for password input
}) {
  // Message shown for general account creation feedback (e.g. success/failure)
  const [createAcctMessage, setCreateAcctMessage] = useState("");

  // Message specifically related to email input (e.g. invalid format, already in use)
  const [emailMessage, setEmailMessage] = useState("");

  // Message specifically related to password input (e.g. too short, insecure)
  const [passwordMessage, setPasswordMessage] = useState("");

  // Tracks if account creation succeeded or failed
  const [isSuccessful, setIsSuccessful] = useState(null);

  // Toggles visibility of password field
  const [showCreateAcctPassword, setShowCreateAcctPassword] = useState(false);

  // Handler to toggle password visibility
  const toggleCreateAcctPasswordVisibility = () => {
    setShowCreateAcctPassword(!showCreateAcctPassword);
  };

  return (
    <>
      {/* The form UI and logic are handled inside CreateAccountCard */}
      <CreateAccountCard
        createUserWithEmailAndPassword={createUserWithEmailAndPassword}
        auth={auth}
        email={email}
        password={password}
        emailMessage={emailMessage}
        passwordMessage={passwordMessage}
        createAcctMessage={createAcctMessage}
        setEmail={setEmail}
        setPassword={setPassword}
        showCreateAcctPassword={showCreateAcctPassword}
        setCreateAcctMessage={setCreateAcctMessage}
        setEmailMessage={setEmailMessage}
        setPasswordMessage={setPasswordMessage}
        isSuccessful={isSuccessful}
        setIsSuccessful={setIsSuccessful}
        toggleCreateAcctPasswordVisibility={toggleCreateAcctPasswordVisibility}
      />
    </>
  );
}
