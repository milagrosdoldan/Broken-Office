import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const Perfil = () => {
  return (
    <>
      <Heading>Mi perfil</Heading>
      <Box>
        <Image
          borderRadius="full"
          boxSize="150px"
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
        />
        <Text>LOREM IPSUM</Text>
      </Box>
    </>
  );
};

export default Perfil;
