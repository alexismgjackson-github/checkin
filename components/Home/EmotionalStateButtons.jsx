import "./EmotionalStateButtons.css";

export default function EmotionalStateButtons({
  emotion,
  id,
  url,
  alt,
  label,
  onEmotionClick,
  isSelected,
}) {
  // when the button is clicked, it calls the parent function onEmotionClick
  // passes the label of this emotion

  const toggleClick = () => {
    onEmotionClick(label); // passing the emotion label to the parent (CheckInFormAndList)
  };

  return (
    <>
      <button
        className={`emotional-state-btn ${emotion} ${
          isSelected ? "selected" : ""
        }`}
        id={id}
        onClick={toggleClick}
      >
        <img className={emotion} src={url} alt={alt} aria-label={label} />
      </button>
    </>
  );
}
