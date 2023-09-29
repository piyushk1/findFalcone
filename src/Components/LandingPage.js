import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Landing.css";
import Footer from "./Footer";

import Hideout from "./Hideout";
import Vehicles from "./Vehicles";
export default function LandingPage(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/game");
    console.log("clicked");
  };

  return (
    <div className="landingPage">
      <Header />
      <div className="container">
        <h1>Welcome to the Planet of Lengaburu</h1>
        <div>
          In the distant galaxy of Tara B, following a recent war with the
          neighboring planet Falicornia, King Shan has sentenced the Queen of
          Falicornia to 15 years of exile.
        </div>
        <div>
          Queen Al Falcone is now in hiding. However, if King Shan can locate
          her before her sentence expires, she will face an additional 15 years
          of exile...
        </div>
        <div>
          King Shan has received intelligence indicating that Al Falcone is
          concealed within one of these six planets: DonLon, Enchai, Jebing,
          Sapir, Lerbin, or Pingasor. Unfortunately, he has limited resources at
          his disposal and can only send his army to four of these planets. Your
          challenge is to assist King Shan in finding Queen Al Falcone.
        </div>
      </div>

      <div>
        <Vehicles />
      </div>

      <div>
        <Hideout />
      </div>
      <div className="button-container">
        <button className="start-button" onClick={handleClick}>
          Start Game
        </button>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
