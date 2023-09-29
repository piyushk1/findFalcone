import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <a
          href="https://github.com/piyushk1"
          className="github-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Portfolio
        </a>
      </div>
      <div>
        <p className="footer-text">
          Made with{" "}
          <span role="img" aria-label="Love">
            ❤️
          </span>{" "}
          by Piyush
        </p>
      </div>

      <div>
        <p className="footer-text">
          Coding Problem at :
          <a
            href="https://www.geektrust.com/coding/detailed/space"
            target="_blank"
            className="coding-problem-link"
          >
            Finding Falcone
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
