import GoogleMapReact from "google-map-react";

import styles from "../styles/location.module.css";

const LocationMarker = ({ text }) => {
  return <div className={styles.marker}></div>;
};

export default function Map(props) {
  const lng = props.coords.coordinates[0];
  const lat = props.coords.coordinates[1];
  const title = props.name;

  return (
    <div className={styles.locationMap} style={{ width: "80%", height: "200px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        defaultCenter={[lat, lng]}
        defaultZoom={14}
        yesIWantToUseGoogleMapApiInternals={true}
      >
        <LocationMarker text={title} lat={lat} lng={lng} />
      </GoogleMapReact>
    </div>
  );
}
