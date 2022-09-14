import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  useColorModeValue,
} from "@chakra-ui/react";

import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReportData from "./ReportData";

const CartReports = () => {
  const report = useSelector((state) => state.report);

  return (
    <Box
      mt={15}
      display="flex"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
    >
      <Box
        display="flex"
        flexDirection="row"
        w={{ xl: 500, lg: 700 }}
        bg={useColorModeValue("white", "black")}
        p="1.5rem"
        h="full"
        justifyContent="center"
      >
        <Box>
          <Accordion
            width={{ xl: "70vh", lg: "80vh", base: "40vh" }}
            allowToggle
          >
            <AccordionItem>
              <AccordionButton>
                <Box
                  width={{ xl: "70vh", lg: "80vh", base: "40vh" }}
                  justifyContent="center"
                >
                  Reportes
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <TableContainer
                  width={{ xl: "70vh", lg: "70vh", md: "70vh", base: "60vh" }}
                >
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Date:</Th>
                        <Th>Description:</Th>
                        <Th>Info:</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {report.length ? (
                        report.map((e) => {
                          return (
                            <>
                              <Tr key={e._id}>
                                <Td alt={e.date.slice(0, 10)} fontSize={15}>
                                  {e.date.slice(0, 10)}
                                </Td>
                                <Td alt={e.description} fontSize={15}>
                                  {e.description.slice(0, 18)}
                                </Td>
                                <Td>
                                  <Link to={`/report/${e._id}`}>
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
                            </>
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
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

export default CartReports;
