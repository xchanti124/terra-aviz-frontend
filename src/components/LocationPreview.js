import { Link } from "react-router-dom";

const LocationPreview = ({ location }) => {
  const { title, description, imageLink } = location;

  return (
    <div>
      <img src={imageLink} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={"details"} state={location}>
        <button>SHOW MORE</button>
      </Link>
    </div>
  );
};

export default LocationPreview;
