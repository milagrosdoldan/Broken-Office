import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Box, Spinner } from "@chakra-ui/react";
import { setNewUbication } from "../state/newLocation";
import { useSelector } from "react-redux";
const Maps = ({ location }) => {
  setNewUbication(location);
  const newUbication = useSelector((state) => state.newUbication);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_PUBLIC_GOOGLE_API_KEY,
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      w={["300px", "500px", "800px"]}
      h="300px"
      ml="55px"
      mt={15}
      maxWidth="90%"
    >
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
  console.log("🚀 ~ file: Maps.jsx ~ line 32 ~ Maps ~ isLoaded", isLoaded);
};

export default Maps;
