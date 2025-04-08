import "./CheckInsList.css";

export default function CheckInsList() {
  return (
    <>
      <ul className="check-ins-list">
        <li className="check-in-list-item">
          <div className="check-in-list-item-left">
            <div className="check-in-list-item-feeling">
              <img
                className="emoji"
                src="./assets/icons/satisfied.svg"
                alt="Satisfied emoji"
                aria-label="I'm feeling satisfied"
              />
            </div>
          </div>
          <div className="check-in-list-item-right">
            <div className="check-in-list-item-date">
              Tuesday, April 8, 2025
            </div>
            <div className="check-in-list-item-snippet">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
              dicta fugit vitae quas ipsa vero, labore minus aperiam nostrum!
              Quas cum...
            </div>
          </div>
        </li>
        <li className="check-in-list-item">
          <div className="check-in-list-item-left">
            <div className="check-in-list-item-feeling">
              <img
                className="emoji"
                src="./assets/icons/calm.svg"
                alt="Calm emoji"
                aria-label="I'm feeling calm"
              />
            </div>
          </div>
          <div className="check-in-list-item-right">
            <div className="check-in-list-item-date">Monday, April 7, 2025</div>
            <div className="check-in-list-item-snippet">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
              dicta fugit vitae quas ipsa vero, labore minus aperiam nostrum!
              Quas cum...
            </div>
          </div>
        </li>
        <li className="check-in-list-item">
          <div className="check-in-list-item-left">
            <div className="check-in-list-item-feeling">
              <img
                className="emoji"
                src="./assets/icons/sad.svg"
                alt="Sad emoji"
                aria-label="I'm feeling sad"
              />
            </div>
          </div>
          <div className="check-in-list-item-right">
            <div className="check-in-list-item-date">Sunday, April 6, 2025</div>
            <div className="check-in-list-item-snippet">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
              dicta fugit vitae quas ipsa vero, labore minus aperiam nostrum!
              Quas cum...
            </div>
          </div>
        </li>
        <li className="check-in-list-item">
          <div className="check-in-list-item-left">
            <div className="check-in-list-item-feeling">
              <img
                className="emoji"
                src="./assets/icons/content.svg"
                alt="Content emoji"
                aria-label="I'm feeling content"
              />
            </div>
          </div>
          <div className="check-in-list-item-right">
            <div className="check-in-list-item-date">
              Saturday, April 5, 2025
            </div>
            <div className="check-in-list-item-snippet">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
              dicta fugit vitae quas ipsa vero, labore minus aperiam nostrum!
              Quas cum...
            </div>
          </div>
        </li>
        <li className="check-in-list-item">
          <div className="check-in-list-item-left">
            <div className="check-in-list-item-feeling">
              <img
                className="emoji"
                src="./assets/icons/frustrated.svg"
                alt="Frustrated emoji"
                aria-label="I'm feeling frustrated"
              />
            </div>
          </div>
          <div className="check-in-list-item-right">
            <div className="check-in-list-item-date">Friday, April 4, 2025</div>
            <div className="check-in-list-item-snippet">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
              dicta fugit vitae quas ipsa vero, labore minus aperiam nostrum!
              Quas cum...
            </div>
          </div>
        </li>
      </ul>
      <button className="view-more-btn">View more...</button>
    </>
  );
}
