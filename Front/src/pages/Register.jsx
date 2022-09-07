import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import "@fontsource/open-sans";
import "@fontsource/heebo";
import { useDispatch } from "react-redux";
import { signUp } from "../state/user";

const Register = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => dispatch(signUp(data));

  return (
    <HStack w="full" h="100vh">
      <Flex w="full" h="full" borderRightWidth={1}>
        <Image
          objectFit="cover"
          w="full"
          h="full"
          src="https://fotos.perfil.com/2021/03/03/trim/950/534/globant-20210303-1136704.jpg"
        />
      </Flex>
      <Flex w="full" h="full" alignItems="center" justifyContent="center">
        <Stack maxW="lg" spacing={6} p={6}>
          <Heading fontSize="35px" color="third">
            Registrate
          </Heading>

          <Box minWidth="100%" display="flex" flexDirection="row">
            <FormControl isRequired id="name">
              <FormLabel>Name</FormLabel>
              <Input
                width={40}
                placeholder="Name"
                size="md"
                {...register("name", { required: true })}
              ></Input>
              <Box>
                {errors.name?.type === "required" && "Name is required"}
              </Box>
            </FormControl>
            <FormControl id="lastname" isRequired>
              <FormLabel ml={5}>Lastname </FormLabel>
              <Input
                ml={5}
                width={40}
                placeholder="Lastname"
                size="md"
                {...register("lastname", { required: true })}
              ></Input>
              <Box ml="22px">
                {errors.lastname?.type === "required" && "Lastname is required"}
              </Box>
            </FormControl>
          </Box>
          <FormControl isRequired id="email">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              size="md"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                },
              })}
            ></Input>
            {errors.email?.type === "required" && "Email is required"}
            {errors.email?.type === "pattern" && "Invalid email address"}
          </FormControl>
          <FormControl fontFamily="body" isRequired id="password">
            <FormLabel>Password </FormLabel>
            <InputGroup size="md">
              <Input
                fontFamily="body"
                pr="4.5rem"
                size="md"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", { required: true, minLength: "10" })}
              />

              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  alignItems="center"
                  onClick={handleClick}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {errors.password?.type === "required" && "Password is required"}
            {errors.password?.type === "minLength" && "Password is required"}
          </FormControl>
          <Button
            fontFamily="body"
            display="flex"
            mt={4}
            onClick={handleSubmit(onSubmit)}
            borderRadius="40px"
            bg="secondary"
          >
            Register
          </Button>
        </Stack>
      </Flex>
    </HStack>
  );
};

export default Register;
