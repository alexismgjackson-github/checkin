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
            <span className="check-in-list-length">{checkIns.length} check-ins found</span>
          ) : null}
          <div className="checkin-list-scroll-wrapper">
            {checkIns.length === 0 ? (
              <p className="no-checkins-message">It looks a little empty...</p>
            ) : (
              <ul className="check-ins-list">
                {checkIns.map((checkIn) => (
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
          </div>
        </div>
      </div>
    </>
  );
}
