import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import "./Landing.css";
import Footer from "./Footer/Footer";
import Hideout from "./Hideout";
import Vehicles from "./Vehicles";
import StartButton from "./StartButton/StartButton";

export default function LandingPage(props) {
  return (
    <div className="landingPage">
      <Header />
      <Vehicles />
      <Hideout />
      <StartButton />
      <Footer />
    </div>
  );
}
