import { useNavigate } from "react-router";
import "./Home.css";

export default function Home(props) {
  //// navigate to login page on successful logout

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/`);
  }

  return (
    <>
      <div className="home-page-container animate__animated animate__fadeIn">
        <h1>Home page</h1>
        <span className="log-out" onClick={handleClick}>
          log out
        </span>
      </div>
    </>
  );
}
