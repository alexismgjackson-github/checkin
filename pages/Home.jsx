import { useState, useEffect } from "react";
import {
  onSnapshot, // sets up a listener on a Firestore document/collection so that you can receive real-time updates whenever the data changes
  query, // filters or sorts data from a collection before retrieving it
  where, // filters documents in a collection by specifying a condition on a field
  orderBy, // query to sort documents by a specific field, either in ascending or descending order
  doc, // references a specific document in a collection — either to read, write, update, or delete it
  deleteDoc, // permanently removes a specific document from a collection
  updateDoc, // modifies specific fields in an existing document without overwriting the entire document
  serverTimestamp, // sets a field to the server's current time - ensuring accurate and consistent timestamps
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

  // state to store and manage a list of check-ins, starting as empty

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

  // dynamically renders a list of clickable emotion buttons, tracks which one is selected, and highlights it appropriately

  const emojiButtonElements = data.map((button) => {
    return (
      <EmotionalStateButtons
        key={button.id}
        {...button}
        onEmotionClick={(emotionLabel) => {
          setSelectedEmotion(emotionLabel);
          setCurrentFeeling(emotionLabel);
        }}
        isSelected={selectedEmotion === button.label}
      />
    );
  });

  // opens or closes the modal

  const toggleModalVisibility = () => setIsOpen((prevIsOpen) => !prevIsOpen);

  // signs out the user via firebase auth, then redirects them to the homepage after a short delay

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // console.log("User is successfully logging out");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        // console.error(error.message);
        // console.log("User failed to logout of the app");
      });
  };

  // fetches the logged-in user’s check-ins from firestore in real time and keeps them up to date as they change

  const fetchInRealtimeAndRenderCheckInsFromDB = (user) => {
    // if no user is logged in, stop — don’t try to fetch anything
    if (!user) return;

    // points to the "checkins" collection in your firestore database
    const checkInRef = collection(db, collectionName);

    // filters the collection so you only get (check-ins) where the uid matches the current user's ID
    // orders results by timestamp, newest first
    const q = query(
      checkInRef,
      where("uid", "==", user.uid),
      orderBy("timestamp", "desc")
    );

    // subscribes to real-time updates on that query
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // maps over all returned docs
      // grabs their data and includes the document ID
      // updates your checkIns state with the new list
      const newCheckIns = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setCheckIns(newCheckIns);
    });

    // stops listening when the component unmounts (if needed)
    return unsubscribe;
  };

  // standard input change handler for a controlled form field

  const handleChange = async (event) => {
    setNewCheckIn(event.target.value);
  };

  // creates a new check-in entry in firestore, but only after validating that the user has typed something and selected an emotion

  const addNewCheckIn = async (event) => {
    // prevents the form’s default page refresh on submit
    event.preventDefault();

    // if the user didn't click on an emotion, show an error message and stop
    if (!selectedEmotion) {
      setFieldsetMessage("Please select an emotion");
      return;
    }

    // if the input is empty (or just spaces), do nothing
    if (!newCheckIn.trim()) {
      return;
    }

    // looks up the full emotion object (e.g., to get the emojiUrl) based on the selected label
    const selectedEmotionData = data.find(
      (emotion) => emotion.label === selectedEmotion
    );

    // adds a new document to your "checkins" collection
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        uid: getAuth().currentUser?.uid || "Unknown",
        text: newCheckIn,
        date: formattedDate,
        timestamp: serverTimestamp(),
        emojiUrl: selectedEmotionData ? selectedEmotionData.url : "",
      });

      // console.log("Document written with ID:", docRef.id);
    } catch (e) {
      // console.error("Error adding document:", e);
    }

    // resets the form
    setNewCheckIn("");
    setSelectedEmotion(null);
    setCurrentFeeling("");
    setFieldsetMessage("");
  };

  // deletes a check-in from both firebase firestore and local UI state

  const deleteCheckIn = async (id) => {
    // locates the specific check-in document in the "checkins" collection using its id & deletes it from firestore
    try {
      await deleteDoc(doc(db, "checkins", id));
      // console.log("Check-in deleted successfully");

      // immediately updates your local checkIns state by removing the deleted one
      setCheckIns((prevCheckIns) =>
        prevCheckIns.filter((checkIn) => checkIn.id !== id)
      );
    } catch (error) {
      // console.error("Error deleting check-in:", error);
    }
  };

  // initiates editing mode for a selected check-in

  const editCheckIn = (checkIn) => {
    setIsEditingCheckIn(checkIn);
    setEditCheckInText(checkIn.text);
  };

  // saves any edits made to a check-in, updates it in both firestore and local state

  const updateCheckIn = async () => {
    if (!isEditingCheckIn || !editCheckInText.trim()) return;

    try {
      // locates the check-in document in firestore using its id
      const checkInRef = doc(db, "checkins", isEditingCheckIn.id);

      // updates the text field of the check-in in firestore with the new editCheckInText value
      await updateDoc(checkInRef, {
        text: editCheckInText,
      });

      // console.log("Check-in updated successfully");

      // immediately updates (optimistic updates) the UI to reflect the edited text
      setCheckIns((prevCheckIns) =>
        prevCheckIns.map((checkIn) =>
          checkIn.id === isEditingCheckIn.id
            ? { ...checkIn, text: editCheckInText }
            : checkIn
        )
      );

      // reset the editing state
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

  // disable scrolling on the background when modal is open

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
