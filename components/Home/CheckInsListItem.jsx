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
        <div className="check-in-list-item-date">
          {checkIn.date} @ {checkIn.timestamp}
        </div>
        <div className="check-in-list-item-snippet">{checkIn.text}</div>
      </div>
    </>
  );
}
