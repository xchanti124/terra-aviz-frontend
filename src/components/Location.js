import Map from "./Map";

const Location = ({ location }) => {
  const { title, description, imageLink, coords } = location;
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
