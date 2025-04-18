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
          <ul className="check-ins-list">
            {checkIns.map((checkIn) => (
              <li key={checkIn.id} className="check-in-list-item">
                <CheckInsListItem checkIn={checkIn} />
              </li>
            ))}
          </ul>
          {/*{checkIns.length > 3 ? (
            <button className="view-more-btn">View more...</button>
          ) : null}*/}
        </div>
      </div>
    </>
  );
}
