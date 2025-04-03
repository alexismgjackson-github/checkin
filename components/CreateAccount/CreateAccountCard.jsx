import { useNavigate } from "react-router";
import "./CreateAccountCard.css";

export default function CreateAccountCard() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/`);
  }

  return (
    <>
      <div className="create-account-card">
        <h1 className="create-account-heading">Create an account</h1>
        <form className="create-account-form">
          <div className="create-account-email">
            <label
              className="create-account-email-label"
              htmlFor="create-accountEmail"
            >
              Email
            </label>
            <input
              type="email"
              name="create-accountEmail"
              id="create-accountEmail"
              required
            />
          </div>
          <div className="create-account-password">
            <label
              className="create-account-password-label"
              htmlFor="create-accountPassword"
            >
              Password
            </label>
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
