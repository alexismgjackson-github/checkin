import { useNavigate } from "react-router";
import "./LoginCard.css";

export default function LoginCard({
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  auth,
  email,
  password,
  loginMessage,
  setEmail,
  setPassword,
  setLoginMessage,
  toggleLoginPasswordVisibility,
  showLoginPassword,
}) {
  // handles google login for a user using firebase authentication
  // shows a google login popup, navigates to home page after a successful login (with a 1-second delay)
  // logs any errors if something goes wrong during the login process

  const provider = new GoogleAuthProvider();

  const logInWithGoogle = (event) => {
    event.preventDefault();

    signInWithPopup(auth, provider)
      .then((result) => {
        setTimeout(() => {
          navigate(`/home`);
        }, 1000); // 1 second
        // console.log(`User is logging in with Google`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        // console.log(`GOOGLE ERROR: ${email} - ${errorCode} - ${errorMessage}`);
      });
  };

  // signs in the user with firebase authentication using valid credentials

  const logInWithUserCredentials = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // if the login is successful - delays the redirection to home page by 2 seconds
        // & clear input fields and messages

        // console.log(`User is successfully logging in`);
        setTimeout(() => {
          navigate(`/home`);
        }, 2000); // 2 seconds
        setEmail("");
        setPassword("");
        setLoginMessage("");
      })
      .catch((error) => {
        // if the login fails - error code/message are console logged and login message is displayed
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(`LOG-IN ERROR: ${errorCode} - ${errorMessage}`);
        // console.log(`User's log-in credentials failed`);
        setLoginMessage("Please enter valid user credentials!");
      });
  };

  // navigates the user to the create account page and resets form-related states

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/account`);
    setEmail("");
    setPassword("");
    setLoginMessage("");
  }

  return (
    <>
      <div className="login-card animate__animated animate__fadeIn">
        <h1 className="login-heading">Welcome Back!</h1>
        <form className="login-form" onSubmit={logInWithUserCredentials}>
          <span className="login-card-message error">{loginMessage}</span>
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
          <div className="login-password">
            <div className="login-password-header">
              <label className="login-password-label" htmlFor="loginPassword">
                Password
              </label>
              <button
                type="button"
                className="toggle-password-visibility-btn"
                onClick={toggleLoginPasswordVisibility}
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
          <button className="login-btn">Log In</button>
          <p className="link-to-create-account">
            Don't have an account?{" "}
            <span className="create-account-link" onClick={handleClick}>
              Sign Up
            </span>{" "}
          </p>
        </form>
        <hr />
        <button className="continue-with-google-btn" onClick={logInWithGoogle}>
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
