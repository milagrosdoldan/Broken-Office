import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const CartPermissions = () => {
  return (
    <Box>
      <Heading ml="10" mt="5">
        Permissions
      </Heading>
      <Box
        display="flex"
        flexDirection="row"
        mx="10"
        bg="white"
        p="1.5rem"
        borderRadius="10"
        boxShadow="dark-lg"
      >
        <Box display="flex" flexDirection="column">
          <Text fontWeight="bold">Passes</Text>
          <Text fontWeight="bold">Manages</Text>
          <Text fontWeight="bold">Gropus</Text>
          <Text fontWeight="bold">Roles</Text>
        </Box>
        <Box display="flex" flexDirection="column">
          <Text ml="1rem">Default Pass</Text>
          <Text ml="1rem"> Globant</Text>
          <Text ml="1rem"> None</Text>
          <Text ml="1rem"> None</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPermissions;
