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
  // call the parent function to update the current emotion

  const toggleClick = () => {
    onEmotionClick(label); // pass the emotion label to the parent
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
