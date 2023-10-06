import React, { useState, useEffect } from "react";

import "./HeroSection.css";
export default function HeroSection() {
  return (
    <div className="container">
      <h1>Welcome to the Planet of Lengaburu</h1>
      <div>
        In the distant galaxy of Tara B, following a recent war with the
        neighboring planet Falicornia, King Shan has sentenced the Queen of
        Falicornia to 15 years of exile.
      </div>
      <div>
        Queen Al Falcone is now in hiding. However, if King Shan can locate her
        before her sentence expires, she will face an additional 15 years of
        exile...
      </div>
      <div>
        King Shan has received intelligence indicating that Al Falcone is
        concealed within one of these six planets: DonLon, Enchai, Jebing,
        Sapir, Lerbin, or Pingasor. Unfortunately, he has limited resources at
        his disposal and can only send his army to four of these planets. Your
        challenge is to assist King Shan in finding Queen Al Falcone.
      </div>
    </div>
  );
}
