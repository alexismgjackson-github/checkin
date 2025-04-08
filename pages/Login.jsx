import LoginCard from "../components/Login/LoginCard";
import "./Login.css";

export default function Login({
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  auth,
  email,
  password,
  loginMessage,
  emailMessage,
  passwordMessage,
  setEmail,
  setPassword,
  setLoginMessage,
  setEmailMessage,
  setPasswordMessage,
  togglePasswordVisibility,
  showPassword,
}) {
  return (
    <>
      <LoginCard
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
        togglePasswordVisibility={togglePasswordVisibility}
        showPassword={showPassword}
      />
    </>
  );
}
