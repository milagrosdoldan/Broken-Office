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
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import login from "../style/login.css";
import { useForm } from "react-hook-form";
import { logIn } from "../state/user";
import { useDispatch, useSelector } from "react-redux";
import "@fontsource/open-sans";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
const Login = () => {
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.loginWithGoogle = false;
    dispatch(logIn(data)).then(() => document.cookie && navigate("/profile"));
  };

  const handleCallbackResponse = (response) => {
    let userObject = jwt_decode(response.credential);

    const payload = {
      name: userObject.given_name,
      lastname: userObject.family_name,
      email: userObject.email,
      loginWithGoogle: true,
      picture: userObject.picture,
    };
    dispatch(logIn(payload));
    navigate("/profile");
  };

  useEffect(() => {
    /* global google */ google.accounts.id.initialize({
      client_id:
        "341804667959-sf2nh33is88glm6s2212b6die141qnih.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById(10), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <Box
      className="loginView"
      h={[750, 620, 536]}
      bgImage="url('https://brand.globant.com/wp-content/uploads/2021/10/bg.png')"
    >
      <Box
        className="loginCart"
        display="flex"
        flexDirection="column"
        justify="center"
        justifyContent="space-between"
        alignItems="center"
        borderRadius="10"
        backgroundColor="white"
        p={30}
        h={550}
        margin={100}
      >
        <Heading fontSize="35px" color="third">
          Sig in
        </Heading>
        <Center>
          <FormControl className="login" isRequired>
            <FormLabel textAlign={"center"}>Email</FormLabel>
            <Input
              _focusVisible={{ borderColor: "secondary" }}
              type="email"
              placeholder="Email"
              color="#BFD732"
              size="md"
              {...register("email", { required: true })}
            />

            <Box mb="15px" ml="25px">
              {errors.email?.type === "required" && "Email is required"}
            </Box>
          </FormControl>
        </Center>
        <Center>
          <FormControl className="login" isRequired>
            <FormLabel textAlign={"center"}>Password</FormLabel>
            <InputGroup size="md">
              <Input
                _focusVisible={{ borderColor: "secondary" }}
                fontFamily="body"
                pr="4.5rem"
                size="md"
                type={show ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: true, minLength: "10" })}
              />

              <InputRightElement width="4.5rem" mr={5}>
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
            <Box mb="15px" ml="25px">
              {errors.password?.type === "required" && "Password is required"}
              {errors.password?.type === "minLength" && "Password is required"}
            </Box>
          </FormControl>
        </Center>

        <Button onClick={handleSubmit(onSubmit)} colorScheme="green">
          Log In
        </Button>
        <Box id={10}></Box>
        <Link to="/register">
          <Text textDecoration="underline" mt="5px">
            Need an account? <ExternalLinkIcon mx="2px" />
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
