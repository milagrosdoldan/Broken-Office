import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "../style/login.css";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, Box, Heading, Grid, Text } from "@chakra-ui/react";
import Footer from "../components/Footer";
import ImageList from "@mui/material/ImageList";
import "@fontsource/heebo/700.css";
import ImageListItem from "@mui/material/ImageListItem";
import FormRequest from "../components/FormRequest";



const itemData = [
  {
    img: "https://brand.globant.com/wp-content/uploads/2021/10/print-18.jpg",
    title:
      "Photo of a man working and behind him there is a frame which is painted 'Where globant is innovation design and engineering meet scale.'",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://brand.globant.com/wp-content/uploads/2021/10/cards.jpg",
    title: "Building a new way of being digital",
  },
  {
    img: "https://brand.globant.com/wp-content/uploads/2021/10/aqua.jpg",
    rows: 2,
    title: "Photo of a frame saying globant.",
  },
  {
    img: "https://brand.globant.com/wp-content/uploads/2021/10/showcase-22.jpg",
    title: "Three people sitting in a sofa working",
  },
];

export const Home = () => {
  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();
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
      <Box
        className="box-mapa"
        display="flex"
        flexDirection={{
          base: "column", // 0-48em
          md: "row",
          lg: "row", // 48em-80em,
          xl: "row", // 80em+
        }}
        alignItems={{ base: "center", md: "center" }}
      >
        <Box
          width="50%"
          display="flex"
          flexDirection="column"
          // justifyContent="center"
          alignItems="center"
          pt={{ base: "70px", md: "70px" }}
          mb={{ xl: "150px", lg: "150px" }}
        >
          <Heading
            fontFamily="heading"
            color="black"
            textAlign="left"
            fontSize={41}
          >
            Your location.
          </Heading>{" "}
          <Text
            fontFamily="heading"
            color="black"
            textAlign="left"
            fontSize={20}
            pl={{ xl: "175px", lg: "92px", md: "43px" }}
            pr={{ xl: "115px", lg: "100px", md: "43px" }}
          >
            In this map, you can see where you are!
          </Text>
        </Box>
        <Box
          width={{ xl: "50%", lg: "50%", md: "50%", base: "80%" }}
          height="500px"
          display="flex"
          justifyContent={{
            xl: "flex-end",
            lg: "flex-end",
            md: "center",
            base: "center",
          }}
          mr={{ md: 40, lg: 40, xl: 40 }}
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
      <Grid mt={-50} mb={50}>
        <ImageList
          sx={{ width: "full", height: 246 }}
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
