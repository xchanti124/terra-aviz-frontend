import GoogleMapReact from "google-map-react";
import env from "react-dotenv";

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
    <div style={{ height: "400px", width: "600px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAWwTZC_aBDPn-ziOH-7WiHigO3aJEFCbs" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals="true"
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
