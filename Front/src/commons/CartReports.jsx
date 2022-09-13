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
        w={{ xl: 400, lg: 600 }}
        bg="white"
        p="1.5rem"
        borderRadius="10"
        boxShadow="inner"
      >
        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date:</Th>
                  <Th>Description:</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  {report ? (
                    report.map((e) => {
                      return (
                        <>
                          <Td alt={e.date.slice(0, 10)} fontSize={13}>
                            {e.date.slice(0, 10)}
                          </Td>
                          <Td alt={e.description} fontSize={13}>
                            {e.description}
                          </Td>
                          <Td>
                            <Button textAlign="center" size="sm" mt={2}>
                              +
                            </Button>
                          </Td>
                        </>
                      );
                    })
                  ) : (
                    <Td>SIN DATOS</Td>
                  )}
                </Tr>{" "}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default CartReports;
