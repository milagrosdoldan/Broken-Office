import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Select,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Divider,
  Box,
  Heading,
  useColorModeValue,
  Image,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { sendReport } from "../state/reports";
import { Link } from "react-router-dom";
import "../style/login.css";
import Swal from "sweetalert2";
import { useEffect } from "react";
const FormRequest = () => {
  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [imageSrc, setImageSrc] = useState();
  const color = useColorModeValue("black", "white");
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({ defaultValues: { compañyRole: "" } });

  const onSubmit = async (data) => {
    try {
      data.coord = location;
      data.name = user.name;
      data.lastname = user.lastname;
      data.email = user.email;
      data.image = imageSrc;
      data.date = new Date();

      dispatch(sendReport(data));

      Swal.fire({
        text: "Your report was success!",
        icon: "success",
        width: 400,
        showConfirmButton: false,
        timer: 1500,
        color: "secondary",
      });
    } catch {}
  };

  useEffect(() => {
    async function cleanInputs() {
      if (formState.isSubmitSuccessful) {
        reset({
          compañyRole: "",
          description: "",
          priority: "",
        });
        setImageSrc("");
      }
    }
    cleanInputs();
  }, [formState, reset]);

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
      pb="35px"
      pt="35px"
      margin="0 auto"
      width={["full", "full", "full", "80vh", "80vh", "90vh"]}
      height="full"
      bg={useColorModeValue("white", "black")}
    >
      <Heading
        color={useColorModeValue("#000000", "white")}
        textAlign="center"
        mb={-2}
      >
        Do you have any problem? Tell us!
      </Heading>

      <Stack spacing={6} p={6}>
        <Divider />
        <Popover backgroundColor={useColorModeValue()}>
          <PopoverTrigger backgroundColor="white">
            <Button
              backgroundColor={useColorModeValue("white", "black")}
              _hover={{ backgroundColor: "secondary" }}
            >
              Your report
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody
              alt=" Tell us what you have broken in your office, and we will help you!"
              fontSize={17}
              mt={2}
              textAlign="center"
            >
              Tell us what you have broken in your office, and we will help you!
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {user.email ? (
          <>
            {" "}
            <FormControl isRequired textAlign="center">
              <FormLabel textAlign="center">Company role:</FormLabel>
              <Input
                alt="Your company role in the company."
                _focusVisible={{ borderColor: "third" }}
                textAlign="initial"
                width={["200px", "200px", "330px", "250px", "400px"]}
                placeholder="Company role"
                {...register("compañyRole", { required: true })}
              ></Input>
              <Box>
                {errors.compañyRole?.type === "required" &&
                  "Company role is required."}
              </Box>
            </FormControl>
            <FormControl isRequired textAlign="center">
              <FormLabel textAlign="center">Description:</FormLabel>
              <Input
                alt="The description about the problem you have"
                _focusVisible={{ borderColor: "third" }}
                textAlign="initial"
                placeholder="Description"
                width={["200px", "200px", "330px", "250px", "400px"]}
                {...register("description", { required: true })}
              />
              <Box>
                {errors.description?.type === "required" &&
                  "Description is required."}
              </Box>
            </FormControl>
            <FormControl id="priority" isRequired textAlign="center">
              <FormLabel textAlign="center">Priority</FormLabel>

              <Select
                alt="Select the priority of your problem."
                m="0 auto"
                textAlign="center"
                _focusVisible={{ borderColor: "third" }}
                width={["200px", "200px", "330px", "250px", "400px"]}
                placeholder="Select level:"
              >
                <option {...register("priority", { required: true })}>
                  High
                </option>
                <option {...register("priority", { required: true })}>
                  Medium
                </option>
                <option {...register("priority", { required: true })}>
                  Low{" "}
                </option>
              </Select>
              <Box>
                {errors.priority?.type === "required" &&
                  "Priority is required."}
              </Box>
            </FormControl>
            <FormControl textAlign="center" isRequired>
              <FormLabel textAlign="center">Add file</FormLabel>
              <Input
                textAlign="center"
                m="0 auto"
                width={["200px", "200px", "330px", "250px", "400px"]}
                alt="Add the photos."
                onChange={handleOnChange}
                id="image"
                type="file"
                placeholder="Add a photo"
              />
            </FormControl>
            {imageSrc && (
              <Image alt="your post image" src={imageSrc} maxWidth="50%" />
            )}
            <Button
              color="black"
              fontFamily="body"
              display="flex"
              m="0 auto"
              alt="Submit request."
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
          <Text fontFamily="body" textAlign="center">
            If you want to add a report, you have to be logged! You can log in{" "}
            <Link
              style={{ textDecoration: "underline", color: "#909090" }}
              to="/login"
            >
              here!
              <ExternalLinkIcon ml="5px" mb="4px" />
            </Link>
          </Text>
        )}
      </Stack>
    </Box>
  );
};

export default FormRequest;
