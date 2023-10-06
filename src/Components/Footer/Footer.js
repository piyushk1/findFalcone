import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <a
          href="https://github.com/piyushk1"
          className={styles.githublink}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Portfolio
        </a>
      </div>
      <div>
        <p className={styles.footertext}>
          Made with{" "}
          <span role="img" aria-label="Love">
            ❤️
          </span>{" "}
          by Piyush
        </p>
      </div>

      <div>
        <p className={styles.footertext}>
          Coding Problem at :
          <a
            href="https://www.geektrust.com/coding/detailed/space"
            target="_blank"
            className={styles.codingproblemlink}
          >
            Finding Falcone
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
