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

const Register = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

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
          <Heading fontSize="35px" color="black">
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
            </FormControl>
            {errors.name?.type === "required" && "Name is required"}
            <FormControl isRequired>
              <FormLabel ml={5}>Lastname </FormLabel>
              <Input
                ml={5}
                width={40}
                placeholder="Lastname"
                size="md"
                {...register("lastname", { required: true })}
              ></Input>
              {errors.lastname?.type === "required" && "First name is required"}
            </FormControl>
          </Box>
          <FormControl isRequired id="name">
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
            {errors.email?.type === "pattern" && "Invalid email address"}
          </FormControl>
          <FormControl isRequired id="password">
            <FormLabel>Password </FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                size="md"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", { required: true })}
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
          </FormControl>
          <Button
            display="flex"
            mt={4}
            onClick={handleSubmit(onSubmit)}
            borderRadius="40px"
            backgroundColor="#BFD732"
          >
            Register
          </Button>
        </Stack>
      </Flex>
    </HStack>
  );
};

export default Register;
