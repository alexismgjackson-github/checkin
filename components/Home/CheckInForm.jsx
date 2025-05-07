import "./CheckInForm.css";

// Functional component for the check-in form to record a user's thoughts and emotional state
export default function CheckInForm({
  newCheckIn, // Text input for the user's new check-in
  addNewCheckIn, // Function to add a new check-in (submitted form)
  fieldsetMessage, // Error message for the emotional state fieldset
  emojiButtonElements, // A collection of emoji buttons representing emotional states
  currentFeeling, // Displays the current emotional state the user selected
  handleChange, // Handles the change in the textarea input (user's text)
}) {
  return (
    <>
      <div className="checkin-form-container">
        {/* Form element to submit new check-in */}
        <form className="checkin-form" onSubmit={addNewCheckIn}>
          {/* Fieldset that wraps emotional state selection */}
          <fieldset className="emotion-fieldset" required>
            <legend></legend>
            {/* Display the fieldset error message, if any */}
            <span className="emotion-fieldset-message error">
              {fieldsetMessage}
            </span>

            {/* Container for the emoji buttons representing different emotions */}
            <div className="emotional-state-btns-container">
              {emojiButtonElements}
            </div>
          </fieldset>

          {/* Display the current emotional state */}
          <p className="current-feeling">{currentFeeling}</p>

          {/* Textarea where the user can write down their thoughts */}
          <textarea
            className="checkin-form-textarea"
            name="textarea"
            id="textarea"
            placeholder="Write down your thoughts here..." // Placeholder text
            rows={6} // Defines the number of visible rows in the textarea
            value={newCheckIn} // Controlled input, value comes from parent state
            onChange={handleChange} // Handles changes to the input
            required // Makes the textarea a required field for submission
          ></textarea>

          {/* Button to submit the check-in form */}
          <button className="checkin-form-btn">Save your thoughts</button>
        </form>
      </div>
    </>
  );
}
