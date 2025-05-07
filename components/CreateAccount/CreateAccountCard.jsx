import { useNavigate } from "react-router";
import "./CreateAccountCard.css";

// Functional component to handle user account creation
export default function CreateAccountCard({
  createUserWithEmailAndPassword, // Firebase method for creating a user with email and password
  auth, // Firebase authentication object
  email, // Email entered by the user
  password, // Password entered by the user
  emailMessage, // Message related to email validation or success
  passwordMessage, // Message related to password validation or success
  createAcctMessage, // Message for displaying account creation success or error
  setEmail, // Function to update the email in the parent component's state
  setPassword, // Function to update the password in the parent component's state
  showCreateAcctPassword, // Flag to control the visibility of the password input
  setCreateAcctMessage, // Function to set the account creation message
  setEmailMessage, // Function to set the email validation message
  setPasswordMessage, // Function to set the password validation message
  isSuccessful, // Boolean to track whether the account creation was successful or not
  setIsSuccessful, // Function to set the success status of account creation
  toggleCreateAcctPasswordVisibility, // Function to toggle password visibility
}) {
  // Function to create a user with email and password
  const createUserCredentials = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    // Calls Firebase method to create a user account
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // If account creation is successful
        console.log(`User successfully created an account`);
        setIsSuccessful(true); // Sets success status to true
        setCreateAcctMessage("User credentials were successfully created!"); // Sets success message
        setEmailMessage("Email creation was successful!"); // Sets email success message
        setPasswordMessage("Password creation was successful!"); // Sets password success message

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          navigate(`/home`);
        }, 2000);

        // Clear input fields and messages after 4 seconds
        setTimeout(() => {
          setEmail("");
          setPassword("");
          setCreateAcctMessage("");
          setEmailMessage("");
          setPasswordMessage("");
        }, 4000);
      })
      .catch((error) => {
        // If account creation fails
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`CREATE ACCOUNT ERROR: ${errorCode} - ${errorMessage}`);

        // Set failure status and error messages
        setIsSuccessful(false);
        setCreateAcctMessage("User credentials have failed!");

        // Email validation (regex to check email format)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setEmailMessage("Please enter a valid email");
        }

        // Password validation (check for minimum length)
        if (password.length < 6) {
          setPasswordMessage("Password must contain at least 6 characters");
        }
      });
  };

  // Navigate to the login page and reset form-related states
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
          {/* Display the success or error message for account creation */}
          <span
            className={`create-account-card-message ${
              isSuccessful === null ? "" : isSuccessful ? "success" : "error"
            }`}
          >
            {createAcctMessage}
          </span>

          {/* Email input field */}
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
              onChange={(e) => setEmail(e.target.value)} // Updates email in the state
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

          {/* Password input field */}
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
              onChange={(e) => setPassword(e.target.value)} // Updates password in the state
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

          {/* Button to submit the form and create the account */}
          <button
            className="create-account-btn"
            aria-label="Create an account with these user credentials"
          >
            Sign Up
          </button>

          {/* Link to navigate to the login page */}
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
