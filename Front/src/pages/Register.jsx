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
  useColorModeValue,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signUp } from "../state/user";
import "@fontsource/open-sans";
import "@fontsource/heebo";

const Register = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const user = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(signUp(data));
    user.email && navigate("/login");
  };

  return (
    <HStack
      w="full"
      h="85.7vh"
      flexDirection={{ xl: "row", lg: "row", md: "row", base: "column" }}
    >
      <Flex w="full" h="full">
        <Image
          objectFit="cover"
          w="full"
          h="full"
          src="https://fotos.perfil.com/2021/03/03/trim/950/534/globant-20210303-1136704.jpg"
          alt="Imagen de una oficina de globant"
        />
      </Flex>
      <Flex
        w={["full", "full", "full"]}
        h="full"
        alignItems="center"
        justifyContent="center"
      >
        <Stack maxW="full" spacing={6} p={6}>
          <Heading fontSize="35px" color={useColorModeValue("third", "white")}>
            Register
          </Heading>

          <Box minWidth="100%" display="flex" flexDirection="row">
            <FormControl isRequired id="name">
              <FormLabel>Name</FormLabel>
              <Input
                _focusVisible={{ borderColor: "third" }}
                _hover={{ color: "secondary" }}
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
                _focusVisible={{ borderColor: "third" }}
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
              _focusVisible={{ borderColor: "third" }}
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
                _focusVisible={{ borderColor: "third" }}
                fontFamily="body"
                pr="4.5rem"
                size="md"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", { required: true, minLength: "7" })}
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
            {errors.password?.type === "minLength" && "Minimum ten characters"}
          </FormControl>
          <Button
            fontFamily="body"
            display="flex"
            mt={4}
            color="black"
            onClick={handleSubmit(onSubmit)}
            borderRadius="40px"
            bg="secondary"
            _hover={{ bg: "fourth" }}
          >
            Register
          </Button>
        </Stack>
      </Flex>
    </HStack>
  );
};

export default Register;
