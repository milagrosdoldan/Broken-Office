import { Box, FormControl, Input } from "@chakra-ui/react";
import { useMemo } from "react";
import Navbar from "../components/Navbar";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "../style/login.css";
import { useSelector } from "react-redux";
import { Spinner } from "@chakra-ui/react";
export const Home = () => {
  const location = useSelector((state) => state.location);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBXoLVUJ4X76sJwsjEnuJoQYK1-VQtVR3Q",
  });

  return (
    <div className="map">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "50%", height: "50%" }}
          center={{
            lat: location[0],
            lng: location[1],
          }}
          zoom={15}
        >
          <Marker position={{ lat: location[0], lng: location[1] }} />
          <></>
        </GoogleMap>
      ) : (
        <Spinner pt="80px" color="secondary" size="xl" />
      )}
    </div>
  );
};
