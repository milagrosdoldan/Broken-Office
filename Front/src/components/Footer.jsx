import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box
      flexDirection="column"
      mt={70}
      bg="#000000"
      height="15vh"
      width="full"
      display="flex"
      position="absolute"
    >
      <Image
        ml={4}
        maxWidth="150px"
        src="https://brand.globant.com/wp-content/uploads/2021/10/greenbook-logo-7.jpg"
        alt="Globant Logo"
        mb={-5}
      />
      <Text fontSize={12} color="#b3ae8d" ml={38}>
        {" "}
        All rights reserved Globant 2022
      </Text>
    </Box>
  );
};

export default Footer;
