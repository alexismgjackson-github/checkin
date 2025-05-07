import { useState, useEffect, useRef } from "react";
import DefaultCheckInsListItem from "./DefaultCheckInsListItem";
import EditingCheckInsListItem from "./EditingCheckInsListItem";
import "./CheckInListModal.css";

// Functional component that displays the modal for listing and editing check-ins
export default function CheckInListModal({
  checkIns, // List of check-ins to be displayed
  isOpen, // Boolean to control the visibility of the modal
  toggleModalVisibility, // Function to toggle the visibility of the modal
  deleteCheckIn, // Function to delete a check-in
  editCheckIn, // Function to trigger editing a check-in
  updateCheckIn, // Function to update the check-in after editing
  isEditingCheckIn, // Object that holds the check-in currently being edited
  setIsEditingCheckIn, // Function to toggle editing state of a check-in
  editCheckInText, // Text state for editing check-in
  setEditCheckInText, // Function to update the editing text for a check-in
}) {
  // State to track the current page in the pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Defines how many check-ins will be displayed per page
  const CHECKINS_PER_PAGE = 5;

  // Creates a reference to the scrollable container to control scroll position
  const scrollWrapperRef = useRef(null);

  // Calculates the total number of pages based on check-ins and items per page
  const totalPages = Math.ceil(checkIns.length / CHECKINS_PER_PAGE);

  // Paginate the check-ins to display only the ones relevant to the current page
  const paginatedCheckIns = checkIns.slice(
    (currentPage - 1) * CHECKINS_PER_PAGE, // Starting index of the current page
    currentPage * CHECKINS_PER_PAGE // Ending index of the current page
  );

  // Resets the page to 1 when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
    }
  }, [isOpen]);

  // Automatically scrolls to the top of the list when the current page changes
  useEffect(() => {
    if (scrollWrapperRef.current) {
      scrollWrapperRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  return (
    <>
      <div
        className={`checkin-list-modal-container ${isOpen ? "show" : "hide"}`}
      >
        <div className="checkin-list-container">
          {/* Close button to hide the modal */}
          <button
            className="close-checkin-list-modal-btn"
            onClick={toggleModalVisibility}
          >
            <img
              className="close-checkin-list-icon"
              src="./assets/icons/close.svg"
              alt="Close modal"
              aria-label="Close modal"
            />
          </button>

          {/* Modal header */}
          <h2>Your Check-Ins</h2>

          {/* Show the number of check-ins found */}
          {checkIns.length > 0 ? (
            <span className="check-in-list-length">
              {checkIns.length} check-in(s) found
            </span>
          ) : null}

          <div className="checkin-list-scroll-wrapper" ref={scrollWrapperRef}>
            {/* If there are no check-ins, display a message */}
            {checkIns.length === 0 ? (
              <p className="no-checkins-message">It looks a little empty...</p>
            ) : (
              // Render the check-ins in a paginated list
              <ul className="check-ins-list">
                {paginatedCheckIns.map((checkIn) => (
                  <li key={checkIn.id} className="check-in-list-item">
                    <div className="check-in-list-item-header">
                      {/* If an emoji URL exists, display the emoji image */}
                      {checkIn.emojiUrl && (
                        <img
                          className="check-in-list-item-feeling"
                          src={checkIn.emojiUrl}
                          alt={`${checkIn.text} emoji`}
                        />
                      )}
                      {/* Display the check-in timestamp if available */}
                      <div className="check-in-list-item-date">
                        {checkIn.timestamp &&
                          checkIn.timestamp.toDate().toLocaleString()}
                      </div>
                    </div>
                    <div className="check-in-list-item-body">
                      {/* Conditionally render either the editing form or the default check-in snippet */}
                      {isEditingCheckIn?.id === checkIn.id ? (
                        <EditingCheckInsListItem
                          updateCheckIn={updateCheckIn}
                          isEditingCheckIn={isEditingCheckIn}
                          setIsEditingCheckIn={setIsEditingCheckIn}
                          editCheckInText={editCheckInText}
                          setEditCheckInText={setEditCheckInText}
                        />
                      ) : (
                        <>
                          <p className="check-in-list-item-snippet">
                            {checkIn.text}
                          </p>
                          <DefaultCheckInsListItem
                            checkIn={checkIn}
                            deleteCheckIn={deleteCheckIn}
                            editCheckIn={editCheckIn}
                          />
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Pagination controls */}
            {checkIns.length > 0 && (
              <div className="pagination-controls">
                {/* Previous button: moves to the previous page */}
                <button
                  className="previous-check-ins-btn"
                  onClick={() =>
                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                  }
                  disabled={currentPage === 1} // Disables if the user is on the first page
                >
                  Previous
                </button>

                {/* Current page display */}
                <span className="current-page">
                  Page {currentPage} of {totalPages}
                </span>

                {/* Next button: moves to the next page */}
                <button
                  className="next-check-ins-btn"
                  onClick={() =>
                    setCurrentPage((prevPage) =>
                      Math.min(prevPage + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages} // Disables if the user is on the last page
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
