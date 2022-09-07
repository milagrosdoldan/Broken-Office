import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Heading,
  Box,
  Button,
} from "@chakra-ui/react";
import React from "react";
import login from "../style/login.css";

const Login = () => {
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
        <Heading>Inicia Sesión</Heading>
        <Center>
          <FormControl className="login" isRequired>
            <FormLabel textAlign={"center"}>Email</FormLabel>
            <Input type="email" placeholder="e-mail" color="BFD732" size="md" />
          </FormControl>
        </Center>
        <Center>
          <FormControl className="login" isRequired>
            <FormLabel textAlign={"center"}>Password</FormLabel>
            <Input type="password" placeholder="password" />
          </FormControl>
        </Center>
        <Button colorScheme="green">Iniciar Seción</Button>
      </Box>
    </Box>
  );
};

export default Login;
