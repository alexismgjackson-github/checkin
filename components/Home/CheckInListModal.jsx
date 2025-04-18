import CheckInsListItem from "./CheckInsListItem";
import "./CheckInListModal.css";

export default function CheckInListModal({
  checkIns,
  isOpen,
  toggleModalVisibility,
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
          {checkIns.length === 0 ? (
            <p className="no-checkins-message">
              Looks a little empty! Please check-in.
            </p>
          ) : (
            <ul className="check-ins-list">
              {checkIns.map((checkIn) => (
                <li key={checkIn.id} className="check-in-list-item">
                  <CheckInsListItem checkIn={checkIn} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
