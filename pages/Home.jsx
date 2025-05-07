import { useState, useEffect } from "react";
import {
  onSnapshot, // Listen for real-time updates from Firestore
  query, // Build a query to filter or sort Firestore data
  where, // Filter documents by field condition
  orderBy, // Sort documents by a specific field
  doc, // Reference a specific Firestore document
  deleteDoc, // Delete a document from Firestore
  updateDoc, // Update specific fields of a document
  serverTimestamp, // Assign current server timestamp to a field
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";

import CheckInForm from "../components/Home/CheckInForm";
import CheckInListModal from "../components/Home/CheckInListModal";
import EmotionalStateButtons from "../components/Home/EmotionalStateButtons.jsx";

import data from "../src/emotionsData.js";
import "./Home.css";

export default function Home({
  auth, // Firebase auth object
  signOut, // Firebase signOut method
  onAuthStateChanged, // Firebase method to listen for auth state changes
  db, // Firestore database object
  collection, // Firestore collection function
  addDoc, // Firebase method to add new documents to a collection
}) {
  // ------------------------ STATE VARIABLES ------------------------

  const [checkIns, setCheckIns] = useState([]); // Holds all check-ins from the database
  const [newCheckIn, setNewCheckIn] = useState(""); // User's input for a new check-in
  const [fieldsetMessage, setFieldsetMessage] = useState(""); // Error message for emotion selection
  const [currentFeeling, setCurrentFeeling] = useState(""); // Currently selected emotion label
  const [selectedEmotion, setSelectedEmotion] = useState(null); // Emotion object to be submitted
  const [isOpen, setIsOpen] = useState(false); // Modal visibility state
  const [isEditingCheckIn, setIsEditingCheckIn] = useState(null); // Check-in being edited
  const [editCheckInText, setEditCheckInText] = useState(""); // Text of the edited check-in

  const collectionName = "checkins"; // The Firestore collection name for check-ins
  const navigate = useNavigate(); // Navigation function to redirect to other pages

  // Format the current date for display and storage
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ------------------------ EMOTION BUTTONS ------------------------

  // Map through emotions data to create emoji buttons
  const emojiButtonElements = data.map((button) => (
    <EmotionalStateButtons
      key={button.id}
      {...button}
      onEmotionClick={(emotionLabel) => {
        setSelectedEmotion(emotionLabel);
        setCurrentFeeling(emotionLabel);
      }}
      isSelected={selectedEmotion === button.label} // Mark button as selected if it matches the selected emotion
    />
  ));

  // ------------------------ LOGIC FUNCTIONS ------------------------

  // Toggle the modal visibility (open/close)
  const toggleModalVisibility = () => setIsOpen((prev) => !prev);

  // Log out the user and navigate back to the home page
  const logOut = () => {
    signOut(auth)
      .then(() => {
        setTimeout(() => navigate("/"), 2000); // Navigate to home after 2 seconds
      })
      .catch((error) => {
        // Optional: handle logout error
      });
  };

  // Fetch check-ins from Firestore in real-time
  const fetchInRealtimeAndRenderCheckInsFromDB = (user) => {
    if (!user) return;

    const checkInRef = collection(db, collectionName); // Reference to the checkins collection
    const q = query(
      checkInRef,
      where("uid", "==", user.uid), // Filter by user ID
      orderBy("timestamp", "desc") // Order check-ins by timestamp in descending order
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newCheckIns = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Add document ID to each check-in
      }));
      setCheckIns(newCheckIns); // Update state with the fetched check-ins
    });

    return unsubscribe; // Unsubscribe from Firestore updates when no longer needed
  };

  // Handle input changes for the new check-in text area
  const handleChange = (event) => {
    setNewCheckIn(event.target.value);
  };

  // Add a new check-in to Firestore
  const addNewCheckIn = async (event) => {
    event.preventDefault();

    // Validate that an emotion is selected
    if (!selectedEmotion) {
      setFieldsetMessage("Please select an emotion");
      return;
    }

    // Only submit if there's text entered
    if (!newCheckIn.trim()) return;

    // Find the selected emotion data based on the label
    const selectedEmotionData = data.find(
      (emotion) => emotion.label === selectedEmotion
    );

    try {
      // Add new check-in document to Firestore
      await addDoc(collection(db, collectionName), {
        uid: getAuth().currentUser?.uid || "Unknown", // Store the user ID
        text: newCheckIn, // The check-in text
        date: formattedDate, // The current date
        timestamp: serverTimestamp(), // Firestore server timestamp
        emojiUrl: selectedEmotionData ? selectedEmotionData.url : "", // The selected emotion's emoji URL
      });
    } catch (e) {
      // Optional: handle error
    }

    // Reset form fields after submission
    setNewCheckIn("");
    setSelectedEmotion(null);
    setCurrentFeeling("");
    setFieldsetMessage("");
  };

  // Delete a specific check-in from Firestore
  const deleteCheckIn = async (id) => {
    try {
      await deleteDoc(doc(db, collectionName, id)); // Delete the check-in from Firestore
      setCheckIns((prev) => prev.filter((checkIn) => checkIn.id !== id)); // Remove it from state
    } catch (error) {
      // Optional: handle error
    }
  };

  // Start editing a check-in by selecting it
  const editCheckIn = (checkIn) => {
    setIsEditingCheckIn(checkIn); // Set the check-in to be edited
    setEditCheckInText(checkIn.text); // Set the text for editing
  };

  // Update an edited check-in in Firestore
  const updateCheckIn = async () => {
    if (!isEditingCheckIn || !editCheckInText.trim()) return;

    try {
      const checkInRef = doc(db, collectionName, isEditingCheckIn.id); // Get reference to the check-in document
      await updateDoc(checkInRef, { text: editCheckInText }); // Update the check-in text in Firestore

      setCheckIns((prev) =>
        prev.map((checkIn) =>
          checkIn.id === isEditingCheckIn.id
            ? { ...checkIn, text: editCheckInText }
            : checkIn
        )
      );

      setIsEditingCheckIn(null); // Clear the editing state
      setEditCheckInText(""); // Clear the edit text field
    } catch (error) {
      // Optional: handle error
    }
  };

  // ------------------------ SIDE EFFECTS ------------------------

  // Listen for auth state changes (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchInRealtimeAndRenderCheckInsFromDB(user); // Fetch check-ins if the user is logged in
      }
    });

    return unsubscribe; // Unsubscribe from auth state changes when the component unmounts
  }, []);

  // Disable page scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // ------------------------ RENDER ------------------------

  return (
    <div className="home-page-container animate__animated animate__fadeIn">
      <div className="checkin-list-and-log-out-btn-container">
        {/* Button to view check-ins and logout */}
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

      {/* Modal to display list of check-ins */}
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

      {/* Display current date and question "How are you feeling?" */}
      <p className="current-date">{formattedDate}</p>
      <h1>How are you feeling?</h1>

      {/* Form to submit a new check-in */}
      <CheckInForm
        newCheckIn={newCheckIn}
        emojiButtonElements={emojiButtonElements}
        currentFeeling={currentFeeling}
        fieldsetMessage={fieldsetMessage}
        handleChange={handleChange}
        addNewCheckIn={addNewCheckIn}
      />
    </div>
  );
}
