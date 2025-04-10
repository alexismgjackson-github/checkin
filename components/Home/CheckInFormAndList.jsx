import { useState } from "react";
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
  const [fieldsetMessage, setFieldsetMessage] = useState("");

  // state to track the current feeling

  const [currentFeeling, setCurrentFeeling] = useState("");

  // state to track the selected (clicked) emotion

  const [selectedEmotion, setSelectedEmotion] = useState(null);

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

  const handleChange = (event) => {
    setNewCheckIn(event.target.value);
  };

  const addNewCheckIn = (event) => {
    event.preventDefault();

    // prevent submitting if no emotion is selected
    if (!selectedEmotion) {
      setFieldsetMessage("Please select an emotion");
      return;
    } else {
      setSelectedEmotion(null);
      setCurrentFeeling("");
      setFieldsetMessage("");
    }

    // prevent submitting empty check-ins

    if (!newCheckIn.trim()) {
      return;
    }

    // find the emoji URL for the selected emotion

    const selectedEmotionData = data.find(
      (emotion) => emotion.label === selectedEmotion
    );

    setCheckIns([
      ...checkIns,
      {
        id: uuidv4(),
        text: newCheckIn,
        date: formattedDate,
        emojiUrl: selectedEmotionData ? selectedEmotionData.url : "",
      },
    ]);
    setNewCheckIn("");
  };

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
        {checkIns.length > 0 ? <FilterButtons /> : null}
        <ul className="check-ins-list">
          {checkIns.map((checkIn) => (
            <li key={checkIn.id} className="check-in-list-item">
              <CheckInsListItem checkIn={checkIn} />
            </li>
          ))}
        </ul>
        {checkIns.length > 4 ? (
          <button className="view-more-btn">View more...</button>
        ) : null}
      </div>
    </>
  );
}
