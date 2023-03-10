import { Link } from "react-router-dom";

import styles from "../styles/locationPreview.module.css";

const LocationPreview = ({ location }) => {
  const { title, description, imageLink } = location;

  return (
    <div className={styles.locationPreview}>
      <div className={styles.locationPreviewImg}>
        <img src={imageLink} alt={title} />
      </div>
      <div className={styles.locationPreviewInfo}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={"details"} state={location}>
          Read more...
        </Link>
      </div>
    </div>
  );
};

export default LocationPreview;
