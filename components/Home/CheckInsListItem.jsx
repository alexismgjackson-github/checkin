import "./CheckInsListItem.css";

export default function CheckInsListItem({ checkIn }) {
  return (
    <>
      <div className="check-in-list-item-header">
        {checkIn.emojiUrl && (
          <img
            className="check-in-list-item-feeling"
            src={checkIn.emojiUrl}
            alt={`${checkIn.text} emoji`}
          />
        )}
        <div className="check-in-list-item-date">
          {checkIn.date} @ {checkIn.timestamp}
        </div>
      </div>
      <div className="check-in-list-item-body">
        <div className="check-in-list-item-snippet">{checkIn.text}</div>
      </div>
    </>
  );
}
