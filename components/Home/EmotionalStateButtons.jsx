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
  // This function is triggered when a button is clicked,
  // it calls the onEmotionClick passed from the parent component with the emotion label
  const toggleClick = () => {
    onEmotionClick(label); // Passing the emotion label to the parent component (e.g., CheckInForm)
  };

  return (
    <>
      <button
        // Dynamically sets class names:
        // - `emotional-state-btn` for the base styling,
        // - the `emotion` type (e.g., "happy", "sad") for styling specific to the emotion,
        // - `selected` if this emotion is currently selected
        className={`emotional-state-btn ${emotion} ${
          isSelected ? "selected" : ""
        }`}
        id={id} // ID for this button, useful for unique styling or testing
        onClick={toggleClick} // Calls the toggleClick function on button click
      >
        {/* Displays the image for the emotion, 
            `src` is the URL of the image, `alt` is the description for accessibility */}
        <img className={emotion} src={url} alt={alt} aria-label={label} />
      </button>
    </>
  );
}
