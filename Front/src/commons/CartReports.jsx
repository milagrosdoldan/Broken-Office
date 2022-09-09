import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

const CartReports = () => {
  return (
    <Box display="flex" flexDir="column" alignItems="center">
      <Heading ml="10" mt="5" fontSize="25">
        Reports
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
        <Text>No reports</Text>
      </Box>
    </Box>
  );
};

export default CartReports;
