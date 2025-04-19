import "./DefaultCheckInsListItem.css";

export default function DefaultCheckInsListItem({
  checkIn,
  deleteCheckIn,
  editCheckIn,
}) {
  return (
    <>
      <div className="default-check-in-list-item-buttons">
        <button
          className="delete-btn"
          onClick={() => deleteCheckIn(checkIn.id)}
        >
          Delete
        </button>
        <button className="edit-btn" onClick={() => editCheckIn(checkIn)}>
          Edit
        </button>
      </div>
    </>
  );
}
