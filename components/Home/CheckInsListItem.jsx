import "./CheckInsListItem.css";

export default function CheckInsListItem({ checkIn }) {
  return (
    <>
      <div className="check-in-list-item-left">
        {checkIn.emojiUrl && (
          <img
            className="check-in-list-item-feeling"
            src={checkIn.emojiUrl}
            alt={`${checkIn.text} emoji`}
          />
        )}
      </div>
      <div className="check-in-list-item-right">
        <div className="check-in-list-item-right-header">
          <div className="check-in-list-item-date">{checkIn.date}</div>
          <button className="view-check-in-btn" id={checkIn.id}>
            <img
              className="view-check-in"
              src="./assets/icons/view.svg"
              alt="View this check-in"
              aria-label="View this check-in"
            />
          </button>
        </div>
        <div className="check-in-list-item-snippet">{checkIn.text}</div>
      </div>
    </>
  );
}
