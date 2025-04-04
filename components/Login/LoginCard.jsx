import { useNavigate } from "react-router";
import "./LoginCard.css";

export default function LoginCard(props) {
  //// showLoginError = "please enter valid credientials"

  //// showLoginEmailError - "please enter a valid email address"

  //// showLoginPasswordError - "please enter a valid password"

  //// navigate to home page on successful login

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/account`);
  }

  function handleSubmit() {
    navigate(`/home`);
  }

  return (
    <>
      <div className="login-card animate__animated animate__fadeIn">
        <h1 className="login-heading">Welcome Back!</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <span className="login-card-message"></span>
          <div className="login-email">
            <div className="login-email-header">
              <label className="login-email-label" htmlFor="loginEmail">
                Email
              </label>
              <span className="login-email-input-message"></span>
            </div>
            <input
              type="email"
              name="loginEmail"
              id="loginEmail"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              spellCheck="false"
              autoComplete="off"
              required
            />
          </div>
          <div className="login-password">
            <div className="login-password-header">
              <label className="login-password-label" htmlFor="loginPassword">
                Password
              </label>
              <span className="login-password-input-message"></span>
            </div>
            <input
              type="password"
              name="loginPassword"
              id="loginPassword"
              required
            />
          </div>
          <button className="login-btn">Log In</button>
          <p className="link-to-create-account">
            Don't have an account?{" "}
            <span className="create-account-link" onClick={handleClick}>
              Sign Up
            </span>{" "}
          </p>
        </form>
        <hr />
        <button className="continue-with-google-btn">
          <img
            src="./assets/icons/google.svg"
            alt="Google icon"
            className="google-icon"
          />
          Continue with Google
        </button>
      </div>
    </>
  );
}
