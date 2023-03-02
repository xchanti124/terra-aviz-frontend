import { Link } from "react-router-dom";

import styles from "../styles/location_preview.module.css";

const LocationPreview = ({ location }) => {
  const { title, description, imageLink } = location;

  return (
    <div className={styles.location_preview}>
      <img className={styles.location_preview__img} src={imageLink} alt={title} />
      <div className={styles.location_preview__info}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={"details"} state={location}>
          <button>SHOW MORE</button>
        </Link>
      </div>
    </div>
  );
};

export default LocationPreview;
