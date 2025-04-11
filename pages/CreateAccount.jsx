import { useState } from "react";
import CreateAccountCard from "../components/CreateAccount/CreateAccountCard";
import "./CreateAccount.css";

export default function CreateAccount({
  createUserWithEmailAndPassword,
  auth,
  email,
  password,
  setEmail,
  setPassword,
}) {
  // state to show general account creation messages (e.g., success or failure notices)

  const [createAcctMessage, setCreateAcctMessage] = useState("");

  // state for displaying email messages to the user, such as account creation success, errors, etc

  const [emailMessage, setEmailMessage] = useState("");

  // state for displaying password messages to the user, such as account creation success, errors, etc

  const [passwordMessage, setPasswordMessage] = useState("");

  // state to track whether account creation was successful

  const [isSuccessful, setIsSuccessful] = useState(null);

  // state determines whether the password is visible in the form

  const [showCreateAcctPassword, setShowCreateAcctPassword] = useState(false);

  // toggle function to flip showCreateAcctPassword between true and false

  const toggleCreateAcctPasswordVisibility = () => {
    setShowCreateAcctPassword(!showCreateAcctPassword);
  };

  return (
    <>
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
