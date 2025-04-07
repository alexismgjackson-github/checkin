import { useNavigate } from "react-router";
import EmotionalStateButtons from "../components/Home/EmotionalStateButtons";
import CheckInForm from "../components/Home/CheckInForm";
import CheckInsList from "../components/Home/CheckInsList";
import FilterButtons from "../components/Home/FilterButtons";
import CheckInModal from "../components/Home/CheckInModal";
import "./Home.css";

export default function Home({ auth, signOut }) {
  const user = auth.currentUser;
  const navigate = useNavigate();

  // log out the current authenticated user

  function logOut() {
    signOut(auth)
      .then(() => {
        // if the logout is successful - delays the redirection to login page by 2 seconds

        console.log(`User successfully logged out of the app`);
        setTimeout(() => {
          navigate(`/`);
        }, 2000); // 2 seconds
      })
      .catch((error) => {
        // if the logout fails -  the error message is console logged

        console.error(error.message);
        console.log(`User failed to logout of the app`);
      });
  }

  return (
    <>
      <div className="home-page-container animate__animated animate__fadeIn">
        <h1>Home page</h1>
        <span className="log-out" onClick={logOut}>
          log out
        </span>
        <EmotionalStateButtons />
        <CheckInForm />
        <CheckInsList />
        <FilterButtons />
        <CheckInModal />
      </div>
    </>
  );
}
