import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import LocationPreview from "./LocationPreview";
import SearchBar from "./SearchBar";

import styles from "../styles/locationPreview.module.css";

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

      <div className={styles.btnContainer}>
        <button className={styles.prevBtn}>PREVIOUS</button>
        <button className={styles.nextBtn}>NEXT</button>
      </div>
    </>
  );
};

export default LocationsList;
