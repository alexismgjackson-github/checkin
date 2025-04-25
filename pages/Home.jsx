import { useState, useEffect } from "react";
import {
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import CheckInForm from "../components/Home/CheckInForm";
import CheckInListModal from "../components/Home/CheckInListModal";
import EmotionalStateButtons from "../components/Home/EmotionalStateButtons.jsx";
import data from "../src/emotionsData.js";

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

  // state to show an error if the user tries to submit without selecting an emotion

  const [fieldsetMessage, setFieldsetMessage] = useState("");

  // state to show which emotion was last selected

  const [currentFeeling, setCurrentFeeling] = useState("");

  // state to hold the actual selected emotion label for submission

  const [selectedEmotion, setSelectedEmotion] = useState(null);

  // state to track whether modal is open or closed

  const [isOpen, setIsOpen] = useState(false);

  // state to track which check-in is currently being edited

  const [isEditingCheckIn, setIsEditingCheckIn] = useState(null);

  // state that stores the text content of the check-in being edited

  const [editCheckInText, setEditCheckInText] = useState("");

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

  const toggleModalVisibility = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
    // console.log("Modal's close button clicked");
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // if the logout is successful - delays the redirection to login page by 2 seconds

        // console.log("User is successfully logging out");
        setTimeout(() => {
          navigate("/");
        }, 2000); // 2 seconds
      })
      .catch((error) => {
        // console.error(error.message);
        // console.log("User failed to logout of the app");
      });
  };

  // listens to real-time updates from a firestore database and updates the app’s UI whenever there's a change

  const fetchInRealtimeAndRenderCheckInsFromDB = (user) => {
    // if no user is provided, the function immediately exits by returning undefined

    if (!user) return;

    // creates a reference to a firestore collection using the collection function (instance, collection name)

    const checkInRef = collection(db, collectionName);

    // filters the checkInRef collection based on the uid field

    const q = query(
      checkInRef,
      where("uid", "==", user.uid),
      orderBy("timestamp", "desc")
    );

    // every time there is a change in the data that matches the query, the onSnapshot callback is triggered
    // update the state (setCheckIns) with new check-ins whenever the data changes in firestore

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newCheckIns = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setCheckIns(newCheckIns);
    });

    // return an unsubscribe function to stop listening for real-time updates

    return unsubscribe;
  };

  // updates the text area as the user types

  const handleChange = async (event) => {
    setNewCheckIn(event.target.value);
  };

  // ADD CHECK-IN to firestore database (firebase & ui)

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
        uid: getAuth().currentUser?.uid || "Unknown",
        text: newCheckIn,
        date: formattedDate, // for display
        timestamp: serverTimestamp(),
        emojiUrl: selectedEmotionData ? selectedEmotionData.url : "",
      });

      // console.log("Document written with ID:", docRef.id);
    } catch (e) {
      // console.error("Error adding document:", e);
    }

    // resets the form inputs and error messages so the user can start a fresh check-in

    setNewCheckIn("");
    setSelectedEmotion(null);
    setCurrentFeeling("");
    setFieldsetMessage("");
  };

  // DELETE CHECK-IN from firestore database (firebase & ui)

  const deleteCheckIn = async (id) => {
    try {
      // deletes the check-in with the specified id from the "checkins" collection in firestore

      await deleteDoc(doc(db, "checkins", id));
      // console.log("Check-in deleted successfully");

      // updates the local state (checkIns) by deleting the check-in
      // keeps the UI in sync with what's in the database

      setCheckIns((prevCheckIns) =>
        prevCheckIns.filter((checkIn) => checkIn.id !== id)
      );
    } catch (error) {
      // if there's an error during the deletion, it logs the error to the console
      // console.error("Error deleting check-in:", error);
    }
  };

  // show the edit textarea pre-filled with the current check-in text

  const editCheckIn = (checkIn) => {
    setIsEditingCheckIn(checkIn);
    setEditCheckInText(checkIn.text);
  };

  // UPDATE CHECK-IN text changes (firebase & ui)

  const updateCheckIn = async () => {
    // early exit for invalid input
    if (!isEditingCheckIn || !editCheckInText.trim()) return;

    try {
      // get the firestore document reference
      const checkInRef = doc(db, "checkins", isEditingCheckIn.id);

      // update firestore

      await updateDoc(checkInRef, {
        text: editCheckInText,
      });

      // console.log("Check-in updated successfully");

      // update the UI immediately (local state)

      setCheckIns((prevCheckIns) =>
        prevCheckIns.map((checkIn) =>
          checkIn.id === isEditingCheckIn.id
            ? { ...checkIn, text: editCheckInText }
            : checkIn
        )
      );

      // reset the edit mode

      setIsEditingCheckIn(null);
      setEditCheckInText("");
    } catch (error) {
      // console.error("Error updating check-in:", error);
    }
  };

  // ##########################################################
  // ######################  USE EFFECTS ######################
  // ##########################################################

  // only runs once (because of the empty [] dependency array)
  // uses firebase onAuthStateChanged() to listen for login/logout changes

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(`User has successfully logged in`);
        fetchInRealtimeAndRenderCheckInsFromDB(user);
      } else {
        // console.log("User has successfully logged out");
      }
    });
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
                alt="View check-ins"
                aria-label="View check-ins"
              />
            </button>
            <span className="checklist-count">{checkIns.length}</span>
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
          deleteCheckIn={deleteCheckIn}
          editCheckIn={editCheckIn}
          updateCheckIn={updateCheckIn}
          isEditingCheckIn={isEditingCheckIn}
          setIsEditingCheckIn={setIsEditingCheckIn}
          editCheckInText={editCheckInText}
          setEditCheckInText={setEditCheckInText}
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
