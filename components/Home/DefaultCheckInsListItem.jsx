import "./DefaultCheckInsListItem.css";

// Functional component for a default check-in item that includes options to edit or delete
export default function DefaultCheckInsListItem({
  checkIn, // The check-in object that contains the information for the check-in
  deleteCheckIn, // Function to delete the current check-in
  editCheckIn, // Function to edit the current check-in
}) {
  return (
    <>
      {/* Container for the buttons */}
      <div className="default-check-in-list-item-buttons">
        {/* Delete button: calls deleteCheckIn function when clicked */}
        <button
          className="delete-btn"
          onClick={() => deleteCheckIn(checkIn.id)} // Passes the check-in's ID to the deleteCheckIn function
        >
          Delete
        </button>
        {/* Edit button: calls editCheckIn function when clicked */}
        <button
          className="edit-btn"
          onClick={() => editCheckIn(checkIn)} // Passes the check-in object to the editCheckIn function
        >
          Edit
        </button>
      </div>
    </>
  );
}
