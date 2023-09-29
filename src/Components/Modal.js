import React from "react";
import "./Modal.css";
const Modal = ({ isOpen, onClose, planetName, timeTaken, onRestart }) => {
  if (!isOpen) {
    return null;
  }

  const restartGame = () => {
    if (typeof onRestart === "function") {
      onRestart();
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h1>
          {planetName
            ? "Misson Successful! Congratulations on finding Falcone! King Shan is Mighty Pleased!"
            : "Mission Failed! Falcone Remains Elusive "}
        </h1>
        {planetName && (
          <div>
            <h1>Time Taken: {timeTaken}</h1>
            <h1>Planet found: {planetName}</h1>
          </div>
        )}
        <button onClick={restartGame}>Start Again</button>
      </div>
    </div>
  );
};

export default Modal;
