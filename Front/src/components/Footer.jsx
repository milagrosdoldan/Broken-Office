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
        w="150px"
        h="100%"
        src="https://i.ibb.co/SxKhWCJ/Captura-desde-2022-09-14-16-08-00.png"
        alt="Globant Logo"
        mb={-5}
      />
      <Text fontSize={12} color="#b3ae8d" ml={19.5} mb={5}>
        {" "}
        All rights reserved Globant 2022
      </Text>
    </Box>
  );
};

export default Footer;
