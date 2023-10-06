import react from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StartButton.module.css";

export default function StartButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/game");
    console.log("clicked");
  };

  return (
    <div className="buttoncontainer">
      <button className={styles.startbutton} onClick={handleClick}>
        Start Game
      </button>
    </div>
  );
}
