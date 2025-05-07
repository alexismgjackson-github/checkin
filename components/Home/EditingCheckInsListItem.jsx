import "./EditingCheckInsListItem.css";

// Functional component for editing a check-in item
export default function EditingCheckInsListItem({
  updateCheckIn, // Function to handle updating the check-in
  setIsEditingCheckIn, // Function to stop the editing mode and return to normal view
  editCheckInText, // Text state of the check-in being edited
  setEditCheckInText, // Function to update the text being edited
}) {
  return (
    <>
      {/* Textarea for editing the check-in text */}
      <textarea
        className="check-in-list-textarea"
        name="textarea"
        id="textarea"
        value={editCheckInText} // Controlled component, value is from the state
        onChange={(event) => setEditCheckInText(event.target.value)} // Updates the state on text change
      ></textarea>
      <div className="editing-check-in-list-item-buttons">
        {/* Button to update the check-in */}
        <button
          className="update-btn"
          onClick={() => updateCheckIn()} // Calls the updateCheckIn function passed from parent
          alt="Update check-in"
          aria-label="Update check-in"
        >
          Update
        </button>
        {/* Button to cancel the editing and exit edit mode */}
        <button
          className="cancel-btn"
          onClick={() => setIsEditingCheckIn(null)} // Stops editing and resets editing state to null
          alt="Cancel action"
          aria-label="Cancel action"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
