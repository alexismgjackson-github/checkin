import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import EmotionalStateButtons from "./EmotionalStateButtons.jsx";
import FilterButtons from "./FilterButtons.jsx";
import data from "../../src/emotionsData.js";
import { v4 as uuidv4 } from "uuid"; // generates random UUIDs from the uuid package
import CheckInsListItem from "./CheckInsListItem";
import "./CheckInFormAndList.css";

export default function CheckInFormAndList({
  checkIns,
  setCheckIns,
  newCheckIn,
  setNewCheckIn,
  formattedDate,
  db,
  addDoc,
  collection,
}) {
  const collectionName = "checkins";

  // state to show an error if the user tries to submit without selecting an emotion

  const [fieldsetMessage, setFieldsetMessage] = useState("");

  // state to show which emotion was last selected

  const [currentFeeling, setCurrentFeeling] = useState("");

  // state to hold the actual selected emotion label for submission

  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const [sortOrder, setSortOrder] = useState("recent");

  // state for time

  const [time, setTime] = useState(new Date());

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

  // controls the order in which check-ins are displayed
  // showing the newest first or oldest first

  const toggleCheckInsOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "recent" ? "oldest" : "recent"));
  };

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

  return (
    <>
      <div className="checkin-form-container">
        <form className="checkin-form" onSubmit={addNewCheckIn}>
          <fieldset className="emotion-fieldset" required>
            <legend></legend>
            <span className="emotion-fieldset-message error">
              {fieldsetMessage}
            </span>
            <div className="emotional-state-btns-container">
              {emojiButtonElements}
            </div>
          </fieldset>
          <p className="current-feeling">{currentFeeling}</p>
          <textarea
            className="checkin-form-textarea"
            name="textarea"
            id="textarea"
            placeholder="Write down your thoughts here..."
            value={newCheckIn}
            onChange={handleChange}
            required
          ></textarea>
          <button className="checkin-form-btn">Save your thoughts</button>
        </form>
      </div>
      <div className="checkin-list-container">
        {checkIns.length > 0 ? (
          <FilterButtons
            toggleCheckInsOrder={toggleCheckInsOrder}
            sortOrder={sortOrder}
          />
        ) : null}
        <ul className="check-ins-list">
          {checkIns.map((checkIn) => (
            <li key={checkIn.id} className="check-in-list-item">
              <CheckInsListItem checkIn={checkIn} />
            </li>
          ))}
        </ul>
        {checkIns.length > 3 ? (
          <button className="view-more-btn">View more...</button>
        ) : null}
      </div>
    </>
  );
}
