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
  showCreateAcctPassword,
  setCreateAcctMessage,
  setEmailMessage,
  setPasswordMessage,
  isSuccessful,
  setIsSuccessful,
  toggleCreateAcctPasswordVisibility,
}) {
  // creates a user account with firebase auth

  const createUserCredentials = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // if the account creation is successful - delays the redirection to home page by 2 seconds

        console.log(`User successfully created an account`);
        setIsSuccessful(true);
        setCreateAcctMessage("User credentials were successfully created!");
        setEmailMessage("Email creation was successful!");
        setPasswordMessage("Password creation was successful!");
        setTimeout(() => {
          navigate(`/home`);
        }, 2000); // 2 seconds

        // clear input fields and messages 4 seconds later

        setTimeout(() => {
          setEmail("");
          setPassword("");
          setCreateAcctMessage("");
          setEmailMessage("");
          setPasswordMessage("");
        }, 4000); // 4 seconds
      })
      .catch((error) => {
        // if the account creation fails - error code/message are console logged

        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(`CREATE ACCOUNT ERROR: ${errorCode} - ${errorMessage}`);
        // console.log(`User's account creation failed`);

        // error messages are displayed for create account card

        setIsSuccessful(false);
        setCreateAcctMessage("User credentials have failed!");

        // validating email format

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // method used to test if a string matches a regular expression
        if (!emailRegex.test(email)) {
          setEmailMessage("Please enter a valid email");
        }

        // validating password length

        if (password.length < 6) {
          setPasswordMessage("Password must contain at least 6 characters");
        }
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
            }`} // apply specific styles for each state - green for "isSuccessful" and red for "!isSuccessful"
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
            </div>
            <input
              type="email"
              name="create-accountEmail"
              id="create-accountEmail"
              spellCheck="false"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span
              className={`create-account-email-input-message ${
                isSuccessful === null ? "" : isSuccessful ? "success" : "error"
              }`}
            >
              {emailMessage}
            </span>
          </div>
          <div className="create-account-password">
            <div className="create-account-password-header">
              <label
                className="create-account-password-label"
                htmlFor="create-accountPassword"
              >
                Password
              </label>
              <button
                type="button"
                className="toggle-password-visibility-btn"
                onClick={toggleCreateAcctPasswordVisibility}
                aria-label="Show or hide password text"
              >
                {showCreateAcctPassword ? "Hide Password" : "Show Password"}
              </button>
            </div>
            <input
              type={showCreateAcctPassword ? "text" : "password"}
              name="create-accountPassword"
              id="create-accountPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className={`create-account-password-input-message ${
                isSuccessful === null ? "" : isSuccessful ? "success" : "error"
              }`}
            >
              {passwordMessage}
            </span>
          </div>
          <button
            className="create-account-btn"
            aria-label="Create an account with these user credentials"
          >
            Sign Up
          </button>
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
