import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import CheckInFormAndList from "../components/Home/CheckInFormAndList";
import "./Home.css";

export default function Home({ auth, signOut, onAuthStateChanged }) {
  // state that initializes with stored check-ins from localStorage (if any)
  // otherwise, starts with an empty array
  // "checkIns" holds all submitted entries

  const [checkIns, setCheckIns] = useState(
    localStorage.getItem("checkins")
      ? JSON.parse(localStorage.getItem("checkins"))
      : []
  );

  // state that holds the value of the current check-in the user is typing

  const [newCheckIn, setNewCheckIn] = useState("");

  // the current date
  // displayed to the user and used in saved check-ins

  const today = new Date();

  // formats today's date into 'Tuesday, April 1st, 2025'

  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long", // for full weekday name (e.g., 'Tuesday')
    year: "numeric", // for full year (e.g., 2025)
    month: "long", // for full month name (e.g., 'April')
    day: "numeric", // for the day of the month
  });

  // log out the current authenticated user

  const navigate = useNavigate();

  function logOut() {
    signOut(auth)
      .then(() => {
        // if the logout is successful - delays the redirection to login page by 2 seconds

        console.log("User is successfully logging out");
        setTimeout(() => {
          navigate("/");
        }, 2000); // 2 seconds
      })
      .catch((error) => {
        // if the logout fails -  the error message is console logged

        console.error(error.message);
        console.log("User failed to logout of the app");
      });
  }

  // only runs once (because of the empty [] dependency array)
  // uses firebase onAuthStateChanged() to listen for login/logout changes

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(`User has successfully logged in`);
      } else {
        console.log("User has successfully logged out");
      }
    });
  }, []);

  // anytime checkIns changes, it saves the new array to localStorage
  // keeps data persistent across page reloads

  useEffect(() => {
    localStorage.setItem("checkins", JSON.stringify(checkIns));
  }, [checkIns]);

  return (
    <>
      <div className="home-page-container animate__animated animate__fadeIn">
        <div className="log-out-btn-container">
          <button className="log-out-btn" onClick={logOut}>
            <img
              className="log-out"
              src="./assets/icons/logout.svg"
              alt="Log out"
              aria-label="Log out"
            />
          </button>
        </div>
        <p className="current-date">{formattedDate}</p>
        <h1>How are you feeling?</h1>
        <CheckInFormAndList
          checkIns={checkIns}
          setCheckIns={setCheckIns}
          newCheckIn={newCheckIn}
          setNewCheckIn={setNewCheckIn}
          formattedDate={formattedDate}
        />
      </div>
    </>
  );
}
