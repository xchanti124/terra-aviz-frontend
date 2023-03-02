import { useDispatch } from "react-redux";

const LocationPreview = ({ location }) => {
  const { title, description, imageLink } = location;
  const dispatch = useDispatch();

  const onBtnClick = () => {
    dispatch({ type: "LOCATION_REQUESTED" });
  };

  return (
    <div>
      <img src={imageLink} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={onBtnClick}>SHOW MORE</button>
    </div>
  );
};

export default LocationPreview;
