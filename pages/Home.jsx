import { useNavigate } from "react-router";
import "./Home.css";

export default function Home({ auth, signOut }) {
  const user = auth.currentUser;
  const navigate = useNavigate();

  // log out the current authenticated user
  // if the logout is successful - delays the redirection to login page by 2 seconds
  // if the logout fails -  the error message is console logged

  function logOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful
        console.log(`User successfully logged out of the app.`);
        setTimeout(() => {
          navigate(`/`);
        }, 2000); // 2 seconds
      })
      .catch((error) => {
        // An error happened
        console.error(error.message);
        console.log(`User failed to logout of the app.`);
      });
  }
  //// navigate to login page on successful logout

  return (
    <>
      <div className="home-page-container animate__animated animate__fadeIn">
        <h1>Home page</h1>
        <span className="log-out" onClick={logOut}>
          log out
        </span>
      </div>
    </>
  );
}
