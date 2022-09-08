import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

import EditAbout from "./EditAbout";
const CartPerfil = ({ user }) => {
  return (
    <Box display="flex" flexDir="column" alignItems="center">
      <Heading ml="10" mt="5" fontSize="25">
        About
      </Heading>
      <Box
        display="flex"
        flexDirection="row"
        w={[300, 400, 500]}
        bg="white"
        p="1.5rem"
        borderRadius="10"
        boxShadow="inner"
      >
        <Box display="flex" flexDirection="column">
          <Text fontWeight="bold">Email</Text>
          <Text fontWeight="bold">Works From</Text>
          <Text fontWeight="bold">Phone</Text>
          <Text fontWeight="bold">Company Rol</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text ml="1rem">{`${user.email}`}</Text>
          <Text ml="1rem"> Globant</Text>
          <Text ml="1rem"> {user.tel}</Text>
          <Text ml="1rem"> {user.companyRol}</Text> 
        </Box>
        <Box display="flex" alignItems="flex-end" mx={[0, 20, 180]}>
          <EditAbout />
        </Box>
      </Box>
    </Box>
  );
};

export default CartPerfil;
