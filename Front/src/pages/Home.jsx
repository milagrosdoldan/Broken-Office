import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "../style/login.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Spinner,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Divider,
  Img,
  Grid,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { sendReport } from "../state/reports";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import ImageList from "@mui/material/ImageList";
import "@fontsource/heebo/700.css";
import ImageListItem from "@mui/material/ImageListItem";
export const Home = () => {
  const location = useSelector((state) => state.location);
  const report = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
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

    dispatch(sendReport(data));
  };

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

      <Box
        boxShadow="2xl"
        p="6"
        rounded="md"
        bg="white"
        pb="35px"
        pt="35px"
        margin="0 auto"
        width={["40vh", "50vh", "65vh", "70vh", "80vh", "90vh"]}
        height="full"
      >
        <Heading textAlign="center" mb={-7}>
          Did you have any problems? Tell us!
        </Heading>

        <Stack spacing={6} p={6}>
          <Box
            display="flex"
            flex-direction="column"
            align-content="center"
            align-items="center"
          ></Box>{" "}
          <Divider />
          <Popover backgroundColor="white">
            <PopoverTrigger backgroundColor="white">
              <Button
                backgroundColor="white"
                _hover={{ backgroundColor: "secondary" }}
              >
                Your report
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody fontSize={17} mt={2} textAlign="center">
                Tell us what you have broken in your office, and we will help
                you!
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <FormControl isRequired textAlign="center">
            <FormLabel textAlign="center">Compañy role:</FormLabel>
            <Input
              _focusVisible={{ borderColor: "secondary" }}
              textAlign="initial"
              width={["200px", "250px", "330px", "350px", "400px"]}
              placeholder="Compañy role"
              {...register("compañyRole", { required: true })}
            ></Input>
            {errors.compañyRole?.type === "required" &&
              "Compañy role is required."}
          </FormControl>
          <FormControl isRequired textAlign="center">
            <FormLabel textAlign="center">Description:</FormLabel>
            <Input
              _focusVisible={{ borderColor: "secondary" }}
              textAlign="initial"
              placeholder="Description"
              width={["200px", "250px", "330px", "350px", "400px"]}
              {...register("description", { required: true })}
            />
            {errors.descripcion?.type === "required" &&
              "Descripcion is required."}
          </FormControl>
          <FormControl isRequired textAlign="center">
            <FormLabel textAlign="center">Priority</FormLabel>
            <Select
              m="0 auto"
              textAlign="center"
              _focusVisible={{ borderColor: "secondary" }}
              width={["200px", "250px", "330px", "350px", "400px"]}
              placeholder="Select level:"
            >
              <option {...register("priority", { required: true })}>
                High
              </option>
              <option {...register("priority", { required: true })}>
                Medium
              </option>
              <option {...register("priority", { required: true })}>Low</option>
            </Select>
          </FormControl>
        </Stack>

        {user.email ? (
          <Button
            fontFamily="body"
            display="flex"
            m="0 auto"
            width={125}
            onClick={handleSubmit(onSubmit)}
            borderRadius="20px"
            bg="secondary"
            _hover={{ bg: "fourth" }}
          >
            Submit
          </Button>
        ) : (
          <Alert mt={3} status="error">
            <AlertIcon />
            <AlertTitle>You have to be logged!</AlertTitle>
            <AlertDescription>
              <Link style={{ textDecoration: "underline" }} to="/login">
                Log in here!
              </Link>
            </AlertDescription>
          </Alert>
        )}
      </Box>
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
