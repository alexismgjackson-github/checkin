import { useNavigate } from "react-router";
import "./LoginCard.css";

export default function LoginCard() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/account`);
  }

  function handleSubmit() {
    navigate(`/home`);
  }

  return (
    <>
      <div className="login-card">
        <h1 className="login-heading">Welcome Back!</h1>
        <form className="login-form">
          <div className="login-email">
            <label className="login-email-label" htmlFor="loginEmail">
              Email
            </label>
            <input type="email" name="loginEmail" id="loginEmail" required />
          </div>
          <div className="login-password">
            <label className="login-password-label" htmlFor="loginPassword">
              Password
            </label>
            <input
              type="password"
              name="loginPassword"
              id="loginPassword"
              required
            />
          </div>
          <button className="login-btn" onClick={handleSubmit}>
            Log In
          </button>
          <p className="link-to-create-account">
            Don't have an account?{" "}
            <span className="create-account-link" onClick={handleClick}>
              Sign Up
            </span>{" "}
          </p>
        </form>
        <hr />
        <button className="continue-with-google-btn">
          Continue with Google
        </button>
      </div>
    </>
  );
}
