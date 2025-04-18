import { useState, useEffect } from "react";
import { onSnapshot, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import CheckInForm from "../components/Home/CheckInForm";
import CheckInListModal from "../components/Home/CheckInListModal";
import EmotionalStateButtons from "../components/Home/EmotionalStateButtons.jsx";
import data from "../src/emotionsData.js";
import { v4 as uuidv4 } from "uuid"; // generates random UUIDs from the uuid package
import "./Home.css";

export default function Home({
  auth,
  signOut,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
}) {
  // #########################################################
  // ######################  USE STATES ######################
  // #########################################################

  // state that initializes with stored check-ins from localStorage (if any)
  // otherwise, starts with an empty array
  // "checkIns" holds all submitted entries

  const [checkIns, setCheckIns] = useState([]);

  // state that holds the value of the current check-in the user is typing

  const [newCheckIn, setNewCheckIn] = useState("");

  // state for time

  const [time, setTime] = useState(new Date());

  // state to show an error if the user tries to submit without selecting an emotion

  const [fieldsetMessage, setFieldsetMessage] = useState("");

  // state to show which emotion was last selected

  const [currentFeeling, setCurrentFeeling] = useState("");

  // state to hold the actual selected emotion label for submission

  const [selectedEmotion, setSelectedEmotion] = useState(null);

  // state for modal

  const [isOpen, setIsOpen] = useState(false);

  // #########################################################
  // ###################### SET UP LOGIC #####################
  // #########################################################

  // global variable

  const collectionName = "checkins";

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

  // #########################################################
  // ###################### FUNCTIONS ########################
  // #########################################################

  // loops through data (an array of emotion objects)
  // renders a button for each emotion
  // when clicked, sets the selected emotion and currentFeeling

  const emojiButtonElements = data.map((button) => {
    return (
      <EmotionalStateButtons
        key={button.id}
        {...button}
        onEmotionClick={(emotionLabel) => {
          setSelectedEmotion(emotionLabel); // set the selected emotion
          setCurrentFeeling(emotionLabel); // update the current feeling text
        }}
        isSelected={selectedEmotion === button.label} // pass whether the button is selected
      />
    );
  });

  // toggles the isOpen state (opens/closes the modal)
  // logs a message to the console when the button is clicked

  const toggleModalVisibility = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
    console.log("modal button clicked");
  };

  const logOut = () => {
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
  };

  // if no user is provided, the function immediately exits by returning undefined
  // creates a reference to a firestore collection using the collection function (instance, collection name)
  // filters the checkInRef collection based on the uid field
  // every time there is a change in the data that matches the query, the onSnapshot callback is triggered
  // update the state (setCheckIns) with new check-ins whenever the data changes in firestore
  // return an unsubscribe function to stop listening for real-time updates

  const fetchInRealtimeAndRenderCheckInsFromDB = (user) => {
    if (!user) return;

    const checkInRef = collection(db, collectionName);
    const q = query(checkInRef, where("uid", "==", user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newCheckIns = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setCheckIns(newCheckIns);
    });
    return unsubscribe;
  };

  // updates the text area as the user types

  const handleChange = async (event) => {
    setNewCheckIn(event.target.value);
  };

  const addNewCheckIn = async (event) => {
    // prevents the default form behavior

    event.preventDefault();

    // checks if the user selected an emotion
    // if not, it shows an error message and stops further execution using return

    if (!selectedEmotion) {
      setFieldsetMessage("Please select an emotion");
      return;
    }

    // checks if the textarea is empty or just whitespace
    // if so, it silently returns without doing anything

    if (!newCheckIn.trim()) {
      return;
    }

    // looks up the selected emotion in the data array to find the corresponding emoji URL

    const selectedEmotionData = data.find(
      (emotion) => emotion.label === selectedEmotion
    );

    // addDoc() adds a new document to the "checkins" collection
    // uuidv4() generates a unique ID for the check-in
    // it includes the check-in text, time, date, and matching emoji

    try {
      const docRef = await addDoc(collection(db, collectionName), {
        id: uuidv4(),
        uid: getAuth().currentUser?.uid || "anonymous",
        text: newCheckIn,
        timestamp: time.toLocaleTimeString(),
        date: formattedDate,
        emojiUrl: selectedEmotionData ? selectedEmotionData.url : "",
      });

      console.log("Document written with ID:", docRef.id); // logs the Firebase document ID so you can verify that it was saved successfully

      // updates the local state (checkIns) by adding the new check-in at the top of the list
      // keeps the UI in sync with what's in the database

      setCheckIns([
        {
          id: docRef.id,
          text: newCheckIn,
          timestamp: time.toLocaleTimeString(),
          date: formattedDate,
          emojiUrl: selectedEmotionData ? selectedEmotionData.url : "",
        },
        ...checkIns,
      ]);
    } catch (e) {
      console.error("Error adding document:", e); // if there's an error (like network failure), it logs the issue to the console
    }

    // resets the form inputs and error messages so the user can start a fresh check-in

    setNewCheckIn("");
    setSelectedEmotion(null);
    setCurrentFeeling("");
    setFieldsetMessage("");
  };

  // ##########################################################
  // ######################  USE EFFECTS ######################
  // ##########################################################

  // only runs once (because of the empty [] dependency array)
  // uses firebase onAuthStateChanged() to listen for login/logout changes

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(`User has successfully logged in`);
        fetchInRealtimeAndRenderCheckInsFromDB(user);
      } else {
        console.log("User has successfully logged out");
      }
    });
  }, []);

  // useState(new Date()): holds the current time
  // setInterval: updates the time every second
  // toLocaleTimeString(): formats the time like 10:45:12 AM

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // updates every second

    // Cleanup the interval when the component unmounts

    return () => clearInterval(intervalId);
  }, []);

  // if the modal is open prevent the page from scrolling, else allowing scrolling to resume

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  return (
    <>
      <div className="home-page-container animate__animated animate__fadeIn">
        <div className="checkin-list-and-log-out-btn-container">
          <div className="checkin-list-btn-container">
            <button
              className="view-checkin-list-btn"
              onClick={toggleModalVisibility}
            >
              <img
                className="checkin-list-icon"
                src="./assets/icons/list.svg"
                alt="Log out"
                aria-label="Log out"
              />
            </button>
          </div>
          <div className="log-out-btn-container">
            <button className="log-out-btn" onClick={logOut}>
              <img
                className="log-out-icon"
                src="./assets/icons/logout.svg"
                alt="Log out"
                aria-label="Log out"
              />
            </button>
          </div>
        </div>
        <CheckInListModal
          checkIns={checkIns}
          isOpen={isOpen}
          toggleModalVisibility={toggleModalVisibility}
        />
        <p className="current-date">{formattedDate}</p>
        <h1>How are you feeling?</h1>
        <CheckInForm
          newCheckIn={newCheckIn}
          emojiButtonElements={emojiButtonElements}
          currentFeeling={currentFeeling}
          fieldsetMessage={fieldsetMessage}
          handleChange={handleChange}
          addNewCheckIn={addNewCheckIn}
        />
      </div>
    </>
  );
}
