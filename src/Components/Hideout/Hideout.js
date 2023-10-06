import React from "react";
import "./Hideout.css";
import donlon from "./assets/donlon.png";
import enchai from "./assets/enchai.png";
import jebing from "./assets/jebing.png";
import sapir from "./assets/sapir.png";
import pingasor from "./assets/pingasor.png";

const Hideout = () => {
  const imageNames = [donlon, enchai, jebing, sapir, pingasor];

  return (
    <div className="hideOut-container">
      <h1 className="hideout-title">Potential Hideouts</h1>
      <div className="hideout-row">
        {imageNames.map((imageName, index) => (
          <div className="hideout-card" key={index}>
            <img
              src={imageName}
              alt={`Hideout ${index + 1}`}
              className="hideout-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hideout;
