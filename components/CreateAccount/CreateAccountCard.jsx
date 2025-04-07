import { useNavigate } from "react-router";
import "./CreateAccountCard.css";

export default function CreateAccountCard({
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
}) {
  // creates a user account with firebase auth

  const createUserCredentials = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // if the account creation is successful - delays the redirection to home page by 2 seconds
        // & clear input fields and messages 4 seconds later

        const user = userCredential.user;
        console.log(`User successfully created an account`);
        setIsSuccessful(true);
        setCreateAcctMessage("User credentials were successful!");
        setEmailMessage("Email was successful!");
        setPasswordMessage("Password was successful!");
        setTimeout(() => {
          navigate(`/home`);
        }, 2000); // 2 seconds
        setTimeout(() => {
          setEmail("");
          setPassword("");
          setCreateAcctMessage("");
          setEmailMessage("");
          setPasswordMessage("");
        }, 4000); // 4 seconds
      })
      .catch((error) => {
        // if the account creation fails - error code/essage are console logged
        // & an error message is displayed for input fields

        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode} : ${errorMessage}`);
        console.log(`User's account creation failed`);
        setIsSuccessful(false);
        setCreateAcctMessage("User credentials failed!");
        setEmailMessage("Please enter a valid email");
        setPasswordMessage("Must contain 6 characters");
      });
  };

  // navigates the user to login page and resets form-related states

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/`);
    setEmail("");
    setPassword("");
    setCreateAcctMessage("");
    setEmailMessage("");
    setPasswordMessage("");
  }

  return (
    <>
      <div className="create-account-card animate__animated animate__fadeIn">
        <h1 className="create-account-heading">Create an account</h1>
        <form className="create-account-form" onSubmit={createUserCredentials}>
          <span
            className={`create-account-card-message ${
              isSuccessful === null ? "" : isSuccessful ? "success" : "error"
            }`}
          >
            {createAcctMessage}
          </span>
          <div className="create-account-email">
            <div className="create-account-email-header">
              <label
                className="create-account-email-label"
                htmlFor="create-accountEmail"
              >
                Email
              </label>
              <span
                className={`create-account-email-input-message ${
                  isSuccessful === null
                    ? ""
                    : isSuccessful
                    ? "success"
                    : "error"
                }`}
              >
                {emailMessage}
              </span>
            </div>
            <input
              type="email"
              name="create-accountEmail"
              id="create-accountEmail"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              spellCheck="false"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="create-account-password">
            <div className="create-account-password-header">
              <label
                className="create-account-password-label"
                htmlFor="create-accountPassword"
              >
                Password
              </label>
              <span
                className={`create-account-password-input-message ${
                  isSuccessful === null
                    ? ""
                    : isSuccessful
                    ? "success"
                    : "error"
                }`}
              >
                {passwordMessage}
              </span>
            </div>
            <input
              type="password"
              name="create-accountPassword"
              id="create-accountPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="create-account-btn">Sign Up</button>
          <p className="link-to-login">
            Already have an account?{" "}
            <span className="login-link" onClick={handleClick}>
              Log In
            </span>{" "}
          </p>
        </form>
      </div>
    </>
  );
}
