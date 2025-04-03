import "./Header.css";

export default function Header() {
  return (
    <>
      <header>
        <div className="logo">
          <img
            src="./assets/icons/logo-icon.svg"
            alt="Logo icon"
            className="logo-icon"
          />
          <span className="logo-text">Check-In</span>
        </div>
      </header>
    </>
  );
}
