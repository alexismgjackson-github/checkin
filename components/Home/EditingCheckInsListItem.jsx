import "./EditingCheckInsListItem.css";

export default function EditingCheckInsListItem({
  updateCheckIn,
  setIsEditingCheckIn,
  editCheckInText,
  setEditCheckInText,
}) {
  return (
    <>
      <textarea
        className="check-in-list-textarea"
        name="textarea"
        id="textarea"
        value={editCheckInText}
        onChange={(event) => setEditCheckInText(event.target.value)}
      ></textarea>
      <div className="editing-check-in-list-item-buttons">
        <button
          className="update-btn"
          onClick={() => updateCheckIn()}
          alt="Update check-in"
          aria-label="Update check-in"
        >
          Update
        </button>
        <button
          className="cancel-btn"
          onClick={() => setIsEditingCheckIn(null)}
          alt="Cancel action"
          aria-label="Cancel action"
        >
          Cancel
        </button>
      </div>
    </>
  );
}
