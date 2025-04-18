import "./CheckInForm.css";

export default function CheckInForm({
  newCheckIn,
  addNewCheckIn,
  fieldsetMessage,
  emojiButtonElements,
  currentFeeling,
  handleChange,
}) {
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
            rows={6}
            value={newCheckIn}
            onChange={handleChange}
            required
          ></textarea>
          <button className="checkin-form-btn">Save your thoughts</button>
        </form>
      </div>
    </>
  );
}
