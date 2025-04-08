import CreateAccountCard from "../components/CreateAccount/CreateAccountCard";
import "./CreateAccount.css";

export default function CreateAccount({
  createUserWithEmailAndPassword,
  auth,
  email,
  password,
  emailMessage,
  passwordMessage,
  createAcctMessage,
  setEmail,
  setPassword,
  setCreateAcctMessage,
  setEmailMessage,
  setPasswordMessage,
  isSuccessful,
  setIsSuccessful,
  togglePasswordVisibility,
  showPassword,
}) {
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
        setCreateAcctMessage={setCreateAcctMessage}
        setEmailMessage={setEmailMessage}
        setPasswordMessage={setPasswordMessage}
        isSuccessful={isSuccessful}
        setIsSuccessful={setIsSuccessful}
        togglePasswordVisibility={togglePasswordVisibility}
        showPassword={showPassword}
      />
    </>
  );
}
