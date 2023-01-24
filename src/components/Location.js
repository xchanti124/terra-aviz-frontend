const Location = ({ location }) => {
  const { name, description, imageLink } = location;
  // likes,gAPI,comments,hashtags,category
  return (
    <div>
      <img src={imageLink} alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Location;
