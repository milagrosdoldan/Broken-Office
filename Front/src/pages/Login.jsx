import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Heading,
  Box,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";
import login from "../style/login.css";
import { useForm } from "react-hook-form";
import { logIn } from "../state/user";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => dispatch(logIn(data)); 

  return (
    <Box
      className="loginView"
      h={800}
      bgImage="url('https://brand.globant.com/wp-content/uploads/2021/10/bg.png')"
    >
      <Box
        className="loginCart"
        display="flex"
        flexDirection="column"
        justify="center"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="dark-lg"
        borderRadius="10"
        backgroundColor="white"
        p={30}
        h={400}
        margin={100}
      >
        <Heading fontSize="35px">Inicia Sesión</Heading>
        <Center>
          <FormControl className="login" isRequired>
            <FormLabel textAlign={"center"}>Email</FormLabel>
            <Input
              type="email"
              placeholder="e-mail"
              color="#BFD732"
              size="md"
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && "Email is required"}
          </FormControl>
        </Center>
        <Center>
          <FormControl className="login" isRequired>
            <FormLabel textAlign={"center"}>Password</FormLabel>
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
        </Center>
        <Button onClick={handleSubmit(onSubmit)} colorScheme="green">
          Iniciar Sesión
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
