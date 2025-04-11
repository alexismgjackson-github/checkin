import { useState, useEffect } from "react";
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
}) {
  // state to show an error if the user tries to submit without selecting an emotion

  const [fieldsetMessage, setFieldsetMessage] = useState("");

  // state to show which emotion was last selected

  const [currentFeeling, setCurrentFeeling] = useState("");

  // state to hold the actual selected emotion label for submission

  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const [sortOrder, setSortOrder] = useState("recent");

  // state

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

  const handleChange = (event) => {
    setNewCheckIn(event.target.value);
  };

  // this runs when the form is submitted

  const addNewCheckIn = (event) => {
    // prevents default form behavior

    event.preventDefault();

    // if no emotion selected, shows an error message

    if (!selectedEmotion) {
      setFieldsetMessage("Please select an emotion");
      return;
    } else {
      setSelectedEmotion(null);
      setCurrentFeeling("");
      setFieldsetMessage("");
    }

    // if no text typed, silently stop

    if (!newCheckIn.trim()) {
      return;
    }

    // finds the matching emoji URL for the selected emotion
    // adds it to the checkIns array

    const selectedEmotionData = data.find(
      (emotion) => emotion.label === selectedEmotion
    );

    // creates a new check-in object

    setCheckIns([
      {
        id: uuidv4(),
        text: newCheckIn,
        timestamp: time.toLocaleTimeString(),
        date: formattedDate,
        emojiUrl: selectedEmotionData ? selectedEmotionData.url : "",
      },
      ...checkIns,
    ]);
    setNewCheckIn("");
  };

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
        <span className="checkins-length">
          <p className="length">{checkIns.length} Check-In(s) exist</p>
        </span>
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
