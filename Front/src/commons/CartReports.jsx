import {
  Box,
  Button,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useSelect } from "@mui/base";
import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartReports = () => {
  const report = useSelector((state) => state.report);

  return (
    <Box display="flex" flexDir="column" alignItems="center">
      <Heading ml="10" mt="5" fontSize="25">
        Reports
      </Heading>
      <Box
        display="flex"
        flexDirection="row"
        w={{ xl: 500, lg: 700 }}
        bg="white"
        p="1.5rem"
        borderRadius="10"
        h="full"
        boxShadow="inner"
      >
        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date:</Th>
                  <Th>Description:</Th>
                  <Th>More info:</Th>
                </Tr>
              </Thead>
              <Tbody>
                {report ? (
                  report.map((e) => {
                    return (
                      <Tr key={e.id}>
                        <Td alt={e.date.slice(0, 10)} fontSize={13}>
                          {e.date.slice(0, 10)}
                        </Td>
                        <Td alt={e.description} fontSize={13}>
                          {e.description}
                        </Td>
                        <Td>
                          <Link to={`/report/${e.id}`}>
                            <Button
                              bg="secondary"
                              textAlign="center"
                              size="sm"
                              mt={2}
                            >
                              +
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td>SIN DATOS</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default CartReports;
