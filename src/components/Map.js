import GoogleMapReact from "google-map-react";
import env from "react-dotenv";

import styles from "../styles/location.module.css";

const LocationMarker = ({ text }) => {
  return <div>{text}</div>;
};

export default function Map(props) {
  // const {lat, lng} = props.coords;
  // const {title} = props.title;
  const defaultProps = {
    center: {
      lat: 51.2281329,
      lng: 6.7184408,
    },
    zoom: 14,
  };

  return (
    <div className={styles.locationMap} style={{ width: "80%", height: "200px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: env.APIkey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals={true}
      >
        {/* <LocationMarker
          text={title}
          lat={lat}
          lng={lng}
          /> */}
      </GoogleMapReact>
    </div>
  );
}
