import React from "react";
import "./Header.css";
import falcone from "./assets/falcone.png";
import user from "./assets/user.png";
const Header = () => {
  return (
    <div className="header">
      <div className="header-left">
        <img src={falcone} alt="Space Icon" className="space-icon" />
      </div>
      <div className="header-title">Finding Falcone</div>
      <div className="header-right">
        {/* <span className="header-link">Geektrust</span> */}
        <a
          href="https://www.geektrust.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="header-link"
        >
          Geektrust
        </a>
        <img src={user} alt="Avatar" className="avatar" />
      </div>
    </div>
  );
};

export default Header;
