import { useLocation } from "react-router-dom";
import Map from "./Map";

const Location = () => {
  const {state} = useLocation();

  const { title, description, imageLink, coords } = state;
  
  // likes,gAPI,comments,hashtags,category
  return (
    <div>
      <img src={imageLink} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>

      <Map coords={coords} name={title} />
    </div>
  );
};

export default Location;
