import { useNavigate } from "react-router";
import "./LoginCard.css";

export default function LoginCard({
  signInWithEmailAndPassword, // Firebase method to sign in with email/password
  signInWithPopup, // Firebase method to sign in with a third-party popup (e.g., Google)
  GoogleAuthProvider, // Firebase Google provider instance
  auth, // Firebase auth object
  email, // Current email input value (controlled component)
  password, // Current password input value (controlled component)
  loginMessage, // Error message for email/password login
  setEmail, // Updates email input state
  setPassword, // Updates password input state
  setLoginMessage, // Sets login error message
  toggleLoginPasswordVisibility, // Toggles visibility of password field
  showLoginPassword, // Whether password is currently visible
  googleLoginMessage, // Error message for Google sign-in
  setGoogleLoginMessage, // Sets Google sign-in error message
}) {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  // Handles login with Google via Firebase
  const logInWithGoogle = (event) => {
    event.preventDefault();

    signInWithPopup(auth, provider)
      .then(() => {
        setTimeout(() => {
          navigate("/home");
        }, 1000);
        setGoogleLoginMessage("");
      })
      .catch((error) => {
        // Capture Google sign-in errors and notify user
        setGoogleLoginMessage("Google sign-in failed. Please try again.");
      });
  };

  // Handles login with email and password credentials
  const logInWithUserCredentials = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setTimeout(() => {
          navigate("/home");
        }, 2000);
        setEmail("");
        setPassword("");
        setLoginMessage("");
      })
      .catch(() => {
        setLoginMessage("Please enter valid user credentials!");
      });
  };

  // Redirects user to the account creation page and resets login form state
  function handleClick() {
    navigate("/account");
    setEmail("");
    setPassword("");
    setLoginMessage("");
  }

  return (
    <div className="login-card animate__animated animate__fadeIn">
      <h1 className="login-heading">Welcome Back!</h1>

      <form className="login-form" onSubmit={logInWithUserCredentials}>
        <span className="login-card-message error">{loginMessage}</span>

        {/* Email Input */}
        <div className="login-email">
          <div className="login-email-header">
            <label className="login-email-label" htmlFor="loginEmail">
              Email
            </label>
          </div>
          <input
            type="email"
            name="loginEmail"
            id="loginEmail"
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            spellCheck="false"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="login-password">
          <div className="login-password-header">
            <label className="login-password-label" htmlFor="loginPassword">
              Password
            </label>
            <button
              type="button"
              className="toggle-password-visibility-btn"
              onClick={toggleLoginPasswordVisibility}
              aria-label="Show or hide password text"
            >
              {showLoginPassword ? "Hide Password" : "Show Password"}
            </button>
          </div>
          <input
            type={showLoginPassword ? "text" : "password"}
            name="loginPassword"
            id="loginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Login Button */}
        <button
          className="login-btn"
          aria-label="Sign into app with your authorized user credentials"
        >
          Log In
        </button>

        {/* Link to Create Account */}
        <p className="link-to-create-account">
          Don't have an account?{" "}
          <span className="create-account-link" onClick={handleClick}>
            Sign Up
          </span>
        </p>
      </form>

      <hr />

      {/* Google Login Button */}
      <button className="continue-with-google-btn" onClick={logInWithGoogle}>
        <img
          src="./assets/icons/google.svg"
          alt="Google icon"
          className="google-icon"
          aria-label="Sign into app with your Google account"
        />
        Continue with Google
      </button>

      {/* Google Login Error Message */}
      <span className="google-login-card-message error">
        {googleLoginMessage}
      </span>
    </div>
  );
}
