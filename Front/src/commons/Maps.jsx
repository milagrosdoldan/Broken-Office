import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Box, Spinner } from "@chakra-ui/react";

const Maps = ({ location }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBXoLVUJ4X76sJwsjEnuJoQYK1-VQtVR3Q",
  });

  return (
    <Box w={["300px","500px","800px"]} h="300px" m="5" maxWidth="90%">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "300px" }}
          center={{
            lat: location?.[0],
            lng: location?.[1],
          }}
          zoom={15}
        >
          <Marker position={{ lat: location?.[0], lng: location?.[1] }} />
          <></>
        </GoogleMap>
      ) : (
        <Spinner pt="80px" color="secondary" size="xl" />
      )}
    </Box>
  );
      console.log("🚀 ~ file: Maps.jsx ~ line 32 ~ Maps ~ isLoaded", isLoaded)
};

export default Maps;
