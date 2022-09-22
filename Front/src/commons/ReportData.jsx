import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Spinner,
  Table,
  TableContainer,
  Tag,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Maps from "./Maps";

const ReportData = ({ report }) => {
 
  return (
    <>
      <Box
        mt={"-60px"}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading my="5" textAlign="center">
          Report
        </Heading>

        <Box
          display="flex"
          flexDirection={["column", "row", "row"]}
          alignItems="center"
          w="100%"
          justifyContent="space-around"
        >
          <Image
            alt="photo of the report"
            src={report.image || "gibbresh.png"}
            fallbackSrc="https://via.placeholder.com/150"
            minWidth={["60%", "50%", "30%", "20%"]}
            maxWidth="30%"
            maxHeight="550px"
            borderRadius="10"
            mr={{ xl: "45px", lg: "45px", md: "0", base: "0" }}
            mb={{ base: "15px" }}
            ml="120px"
          />

          <Box ml={-10}>
            <Text fontWeight="bold" fontSize={25}>
              {report.title}
            </Text>
            <Text fontWeight="bold">Description</Text>
            <Text maxWidth="300px">{report.description}</Text>
            <TableContainer>
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Td>{report._id}</Td>
                  </Tr>
                  <Tr>
                    <Th>PRIORITY</Th>
                    <Td>{report.priority}</Td>
                  </Tr>
                  <Tr>
                    <Th>NAME</Th>
                    <Td>
                      {report.name} {report.lastname}
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>EMAIL</Th>
                    <Td>{report.email}</Td>
                  </Tr>
                  <Tr>
                    <Th>STATE</Th>
                    <Td>{report.state}</Td>
                  </Tr>
                </Thead>
              </Table>
              <Box mt={17} ml="100px">
                <Chat report={report} />
              </Box>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <HStack spacing={4} m="5">
        {report?.tags?.map((size, i) =>
          i >= 3 ? (
            <></>
          ) : (
            <Tag minW={20} key={i} variant="solid" colorScheme="green">
              {size}
            </Tag>
          )
        )}
      </HStack>

      <Box ml={30}>
        <Maps location={report.coord} />
      </Box>
      <Box />
    </>
  );
};

export default ReportData;
