import React from "react";
import "./Vehicles.css";
import spacePod from "./assets/space2.png";
import spaceShuttle from "./assets/space3.png";
import spaceRocket from "./assets/space1.png";
import spaceShip from "./assets/space4.png";

const vehicleImages = [spacePod, spaceShuttle, spaceRocket, spaceShip];

const Vehicles = () => {
  return (
    <div className="vehicle-container">
      <h2 className="vehicle-title">Available Vehicles</h2>
      <div className="vehicle-row">
        {vehicleImages.map((image, index) => (
          <div className="vehicle-card" key={index}>
            <img
              src={image}
              alt={`Vehicle ${index + 1}`}
              className="vehicle-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vehicles;
