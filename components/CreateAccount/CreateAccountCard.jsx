import { useNavigate } from "react-router";
import "./CreateAccountCard.css";

export default function CreateAccountCard(props) {
  //// showCreateAccountError - "please enter valid credientials"

  //// showCreateAccountEmailError - "please enter a valid email address"

  //// showCreateAccountPasswordError - "must be at least 6 characters"

  //// navigate to home page on successful account creation

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/`);
  }

  function handleSubmit() {
    navigate(`/home`);
  }

  return (
    <>
      <div className="create-account-card animate__animated animate__fadeIn">
        <h1 className="create-account-heading">Create an account</h1>
        <form className="create-account-form" onSubmit={handleSubmit}>
          <span className="create-account-card-message"></span>
          <div className="create-account-email">
            <div className="create-account-email-header">
              <label
                className="create-account-email-label"
                htmlFor="create-accountEmail"
              >
                Email
              </label>
              <span className="create-account-email-input-message"></span>
            </div>
            <input
              type="email"
              name="create-accountEmail"
              id="create-accountEmail"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              spellCheck="false"
              autoComplete="off"
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
              <span className="create-account-password-input-message"></span>
            </div>
            <input
              type="password"
              name="create-accountPassword"
              id="create-accountPassword"
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
