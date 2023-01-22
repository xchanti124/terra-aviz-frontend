import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Location from "./Location";

const LocationsList = () => {
  const { locations } = useSelector(state => state.locations);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "LOCATIONS_REQUESTED" });
  }, [dispatch]);

  return (
    <div>
      {locations.map(location => (
        <Location key={location._id} location={location} />
      ))}
    </div>
  );
};

export default LocationsList;
