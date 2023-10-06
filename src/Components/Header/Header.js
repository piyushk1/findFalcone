import React from "react";
import styles from "../Header/Header.module.css";
import Falcone from "../assets/falcone.png";
import user from "../assets/user.png";
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <img src={Falcone} alt="Space Icon" className={styles.spaceIcon} />
      </div>
      <div className={styles.headerTitle}>Finding Falcone</div>
      <div className={styles.headerRight}>
        <a
          href="https://www.geektrust.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.headerLink}
        >
          Geektrust
        </a>
        <img src={user} alt="Avatar" className={styles.avatar} />
      </div>
    </div>
  );
};

export default Header;
