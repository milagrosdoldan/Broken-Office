import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const CartPerfil = ({ email }) => {
  return (
    <Box width={450}>
      <Heading ml="10" mt="5">
        About
      </Heading>
      <Box
        display="flex"
        flexDirection="row"
        mx="10"
        bg="white"
        p="1.5rem"
        borderRadius="10"
      >
        <Box display="flex" flexDirection="column">
          <Text fontWeight="bold">Email</Text>
          <Text fontWeight="bold">Works From</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text ml="1rem">{`${email}`}</Text>
          <Text ml="1rem"> Globant</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPerfil;
