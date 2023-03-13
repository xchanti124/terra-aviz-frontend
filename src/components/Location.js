import { useLocation } from "react-router-dom";

import Map from "./Map";

import styles from "../styles/location.module.css";

const Location = () => {
  const { state } = useLocation();
  const { title, description, imageLink, loc } = state;

  return (
    <>
      <div className={styles.location}>
        <h2>{title}</h2>
        <p>{description}</p>
        <img src={imageLink} alt={title} />
      </div>

      <Map coords={loc} name={title} />
    </>
  );
};

export default Location;
