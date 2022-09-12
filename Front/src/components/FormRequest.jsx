import React from "react";
import {
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
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Divider,
  Box,
  Heading,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendReport } from "../state/reports";
import { Link } from "react-router-dom";
import "../style/login.css";

const FormRequest = () => {
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

  return (
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
              Tell us what you have broken in your office, and we will help you!
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
            <option {...register("priority", { required: true })}>High</option>
            <option {...register("priority", { required: true })}>
              Medium
            </option>
            <option {...register("priority", { required: true })}>Low</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Foto</FormLabel>
          <Input onChange={handleOnChange} type="file" />
        </FormControl>
        <Image src={imageSrc} />
      </Stack>

      {user.email ? (
        <>
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
        </>
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
  );
};

export default FormRequest;
