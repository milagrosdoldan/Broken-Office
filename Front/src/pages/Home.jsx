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
  Text,
  Stack,
  Button,
  Select,
  FormHelperText,
  Code,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { sendReport } from "../state/reports";

export const Home = () => {
  const location = useSelector((state) => state.location);
  const report = useSelector((state) => state.report);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
  console.log(report, "reportes");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBXoLVUJ4X76sJwsjEnuJoQYK1-VQtVR3Q",
  });

  return (
    <>
      <Box className="map">
        <Heading>You are here: </Heading>
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
      </Box>
      <Box
        boxShadow="2xl"
        p="6"
        rounded="md"
        bg="white"
        pb="35px"
        pt="35px"
        margin="0 auto"
        width="80vh"
        height="full"
      >
        <Heading textAlign="center">
          Did you have any problems? Tell us!
        </Heading>
        <Stack spacing={6} p={6}>
          <Box
            display="flex"
            flex-direction="column"
            align-content="center"
            align-items="center"
          ></Box>{" "}
          <Code fontFamily={"@fontsource/open-sans"} p={2} textAlign="center">
            Your report
          </Code>
          <FormControl isRequired textAlign="center">
            <FormLabel ml={2}>Compañy role:</FormLabel>
            <Input
              _focusVisible={{ borderColor: "secondary" }}
              textAlign="center"
              width="400px"
              placeholder="Compañy role"
              {...register("compañyRole", { required: true })}
            ></Input>
            {errors.compañyRole?.type === "required" &&
              "Compañy role is required."}
          </FormControl>
          <FormControl isRequired textAlign="center">
            <FormLabel ml={2}>Description:</FormLabel>
            <Input
              _focusVisible={{ borderColor: "secondary" }}
              textAlign="center"
              placeholder="Description"
              width="400px"
              {...register("description", { required: true })}
            />
            {errors.descripcion?.type === "required" &&
              "Descripcion is required."}
          </FormControl>
          <FormControl isRequired textAlign="center">
            <FormLabel ml={2}>Priority</FormLabel>
            <Select
              _focusVisible={{ borderColor: "secondary" }}
              width="400px"
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
        <Button
          fontFamily="body"
          display="flex"
          mt={4}
          ml={7}
          width={125}
          onClick={handleSubmit(onSubmit)}
          borderRadius="20px"
          bg="secondary"
          _hover={{ bg: "fourth" }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

/*    <FormControl textAlign="center">
              <FormLabel textAlign="center">Puesto de Trabajo:</FormLabel>
              <Input
                textAlign="center"
                width={80}
                placeholder="Puesto de Trabajo"
              ></Input>
            </FormControl>

            <FormControl textAlign="center">
              <FormLabel textAlign="center">Descripción:</FormLabel>
              <Input textAlign="center" placeholder="Descripción" width={80} />
            </FormControl> 
            */
