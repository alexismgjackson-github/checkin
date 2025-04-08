import "./EmotionalStateButtons.css";

export default function EmotionalStateButtons() {
  return (
    <>
      <div className="emotional-state-btns-container">
        <button className="emotional-state-btn satisfied">
          <img
            className="emoji"
            src="./assets/icons/satisfied.svg"
            alt="Satisfied emoji"
            aria-label="I'm feeling satisfied"
          />
        </button>
        <button className="emotional-state-btn excited">
          <img
            className="emoji"
            src="./assets/icons/excited.svg"
            alt="Excited emoji"
            aria-label="I'm feeling excited"
          />
        </button>
        <button className="emotional-state-btn calm">
          <img
            className="emoji"
            src="./assets/icons/calm.svg"
            alt="Calm emoji"
            aria-label="I'm feeling calm"
          />
        </button>
        <button className="emotional-state-btn content">
          <img
            className="emoji"
            src="./assets/icons/content.svg"
            alt="Content emoji"
            aria-label="I'm feeling content"
          />
        </button>
        <button className="emotional-state-btn stressed">
          <img
            className="emoji"
            src="./assets/icons/stressed.svg"
            alt="Stressed emoji"
            aria-label="I'm feeling stressed"
          />
        </button>
        <button className="emotional-state-btn worried">
          <img
            className="emoji"
            src="./assets/icons/worried.svg"
            alt="Worried emoji"
            aria-label="I'm feeling worried"
          />
        </button>
        <button className="emotional-state-btn frustrated">
          <img
            className="emoji"
            src="./assets/icons/frustrated.svg"
            alt="Frustrated emoji"
            aria-label="I'm feeling frustrated"
          />
        </button>
        <button className="emotional-state-btn sad">
          <img
            className="emoji"
            src="./assets/icons/sad.svg"
            alt="Sad emoji"
            aria-label="I'm feeling sad"
          />
        </button>
      </div>
    </>
  );
}

//  --color-opt-1: #264653; /* satisfied */
//  --color-opt-2: #287271; /* excited */
//  --color-opt-3: #2a9d8f; /* calm */
//  --color-opt-4: #8ab17d; /* content */
//  --color-opt-5: #e9c46a; /* stressed */
//  --color-opt-6: #f4a261; /* worried */
//  --color-opt-7: #ee8959; /* frustrated */
//  --color-opt-8: #e76f51; /* sad */
