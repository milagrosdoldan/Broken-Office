import {
  Box,
  Heading,
  HStack,
  Image,
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
import Maps from "./Maps";

const ReportData = ({ report }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Heading my="5" textAlign="center">
        Report:
      </Heading>
      <Text mb="3" textAlign="center" fontWeight="bold" fontSize="25">
        {report._id}
      </Text>
      <Box
        display="flex"
        flexDirection={["column", "row", "row"]}
        alignItems="center"
        w="100%"
        justifyContent="space-around"
      >
        <Image
          src={report.image || "gibbresh.png"}
          fallbackSrc="https://via.placeholder.com/150"
          minWidth={["60%", "50%", "30%", "20%"]}
          maxWidth="30%"
          borderRadius="10"
        />
        <HStack spacing={4} m="5">
          {report?.tags?.map((size,i) => (
            <Tag size={["sm", "md", "lg"]} key={i} variant="solid" colorScheme="green">
              {size}
            </Tag>
          ))}
        </HStack>
        <Box>
          <Text fontWeight="bold" mt="5">
            Description
          </Text>
          <Text>{report.description}</Text>
          <TableContainer>
            <Table size="sm">
              <Thead>
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
          </TableContainer>
        </Box>
      </Box>
      <Maps location={report.coord} />
    </Box>
  );
};

export default ReportData;
