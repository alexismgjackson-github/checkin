import { useState, useEffect, useRef } from "react";
import DefaultCheckInsListItem from "./DefaultCheckInsListItem";
import EditingCheckInsListItem from "./EditingCheckInsListItem";
import "./CheckInListModal.css";

export default function CheckInListModal({
  checkIns,
  isOpen,
  toggleModalVisibility,
  deleteCheckIn,
  editCheckIn,
  updateCheckIn,
  isEditingCheckIn,
  setIsEditingCheckIn,
  editCheckInText,
  setEditCheckInText,
}) {
  // tracks which page of the paginated list user is currently on

  const [currentPage, setCurrentPage] = useState(1);

  // defines how many check-ins you want to show per page

  const CHECKINS_PER_PAGE = 5;

  // creates a ref for the scroll container

  const scrollWrapperRef = useRef(null);

  // calculates the total number of pages (rounds up to include any remaining items that don't fill a complete page)

  const totalPages = Math.ceil(checkIns.length / CHECKINS_PER_PAGE);

  // selects only the check-ins for the current page

  const paginatedCheckIns = checkIns.slice(
    (currentPage - 1) * CHECKINS_PER_PAGE, // gives the starting index of the current page
    currentPage * CHECKINS_PER_PAGE // gives the ending index of the current page
  );

  // defaults to page 1 when reopening the modal

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(1);
    }
  }, [isOpen]);

  // scrolls to top when currentPage changes

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
          <h2>Your Check-Ins</h2>
          {checkIns.length > 0 ? (
            <span className="check-in-list-length">
              {checkIns.length} check-in(s) found
            </span>
          ) : null}
          <div className="checkin-list-scroll-wrapper" ref={scrollWrapperRef}>
            {checkIns.length === 0 ? (
              <p className="no-checkins-message">It looks a little empty...</p>
            ) : (
              <ul className="check-ins-list">
                {paginatedCheckIns.map((checkIn) => (
                  <li key={checkIn.id} className="check-in-list-item">
                    <div className="check-in-list-item-header">
                      {checkIn.emojiUrl && (
                        <img
                          className="check-in-list-item-feeling"
                          src={checkIn.emojiUrl}
                          alt={`${checkIn.text} emoji`}
                        />
                      )}
                      <div className="check-in-list-item-date">
                        {checkIn.timestamp &&
                          checkIn.timestamp.toDate().toLocaleString()}
                      </div>
                    </div>
                    <div className="check-in-list-item-body">
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
            <div className="pagination-controls">
              <button
                className="previous-check-ins-btn"
                onClick={() =>
                  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                } // when clicked, it decreases the page by 1
                disabled={currentPage === 1} // prevents the button from working if user is already on the first page
              >
                Previous
              </button>
              <span className="current-page">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="next-check-ins-btn"
                onClick={() =>
                  setCurrentPage((prevPage) =>
                    Math.min(prevPage + 1, totalPages)
                  )
                } // increases the page by 1
                disabled={currentPage === totalPages} // disables the button on the last page
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
