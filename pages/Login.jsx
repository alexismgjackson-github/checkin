import LoginCard from "../components/Login/LoginCard";
import "./Login.css";

export default function Login({
  signInWithEmailAndPassword,
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
}) {
  return (
    <>
      <LoginCard
        signInWithEmailAndPassword={signInWithEmailAndPassword}
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
      />
    </>
  );
}
