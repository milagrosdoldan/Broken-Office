import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import "../style/login.css";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Box, Heading, Grid, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { sendReport } from "../state/reports";

import Footer from "../components/Footer";
import ImageList from "@mui/material/ImageList";
import "@fontsource/heebo/700.css";
import ImageListItem from "@mui/material/ImageListItem";
import { useState } from "react";
import FormRequest from "../components/FormRequest";
export const Home = () => {
  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [imageSrc, setImageSrc] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.coord = location;
    data.name = user.name;
    data.lastname = user.lastname;
    data.email = user.email;
    data.image = imageSrc;
    console.log(data);
    dispatch(sendReport(data));
  };

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBXoLVUJ4X76sJwsjEnuJoQYK1-VQtVR3Q",
  });

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  return (
    <>
      <Box display="flex" flexDirection="row">
        <Box
          width="50%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            {" "}
            <Heading fontFamily={"@fontsource/heebo/700.css"}>
              Your location
            </Heading>{" "}
            <Text>You can see where you are here.</Text>
          </Box>
        </Box>
        <Box
          width="50%"
          height="500px"
          display="flex"
          justifyContent="flex-end"
          mr={40}
          mt={90}
        >
          {isLoaded ? (
            <GoogleMap
              mapContainerClassName="map"
              mapContainerStyle={{ width: "90%", height: "60%" }}
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
        </Box>
      </Box>
      <Grid mt={-75} mb={50}>
        <ImageList
          sx={{ width: "full", height: 250 }}
          variant="quilted"
          cols={4}
          rowHeight={121}
        >
          {itemData.map((item) => (
            <ImageListItem
              key={item.img}
              cols={item.cols || 1}
              rows={item.rows || 1}
            >
              <img
                {...srcset(item.img, 121, item.rows, item.cols)}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>

      <FormRequest />
      <Footer />
    </>
  );
};

const itemData = [
  {
    img: "https://brand.globant.com/wp-content/uploads/2021/10/print-18.jpg",
    title: "Breakfast",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://brand.globant.com/wp-content/uploads/2021/10/cards.jpg",
    title: "Burger",
  },
  {
    img: "https://brand.globant.com/wp-content/uploads/2021/10/aqua.jpg",
    rows: 2,
    title: "Camera",
  },
  {
    img: "https://brand.globant.com/wp-content/uploads/2021/10/showcase-22.jpg",
    title: "Coffee",
  },
];
