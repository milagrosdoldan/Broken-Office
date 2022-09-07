import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const CartReports = () => {
  return (
    <Box>
      <Heading ml="10" mt="5">
        Reports
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
        <Text>No reports</Text>
      </Box>
    </Box>
  );
};

export default CartReports;
