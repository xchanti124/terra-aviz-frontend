import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import LocationPreview from "./LocationPreview";
import SearchBar from "./SearchBar";

const LocationsList = () => {
  const { locations } = useSelector(state => state.locations);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "LOCATIONS_REQUESTED" });
  }, [dispatch]);

  return (
    <>
      <SearchBar />

      {locations.map(location => (
        <LocationPreview key={location._id} location={location} />
      ))}
    </>
  );
};

export default LocationsList;
