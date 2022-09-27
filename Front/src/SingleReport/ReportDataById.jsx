import { ArrowLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Image,
  Spinner,
  Table,
  TableContainer,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Maps from "../commons/Maps";

const ReportDataById = () => {
  const report = useSelector((state) => state.idReport);
  console.log(
    "🚀 ~ file: ReportDataById.jsx ~ line 27 ~ ReportDataById ~ report",
    report
  );
  if (!report) {
    <Spinner />;
  } else {
    return (
      <>
        <Box display="flex">
          <Link to="/profile">
            <Button
              color="black"
              borderRadius="40px"
              alt="back to profile"
              bg="secondary"
              ml={5}
              mt={15}
            >
              <ArrowLeftIcon />
            </Button>
          </Link>
        </Box>
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
            justifyContent={{
              xl: "center",
              lg: "center",
              md: "space-evenly",
              base: "space-evenly",
            }}
          >
            <Image
              src={report[0].image}
              alt="photo of the report"
              fallbackSrc="https://via.placeholder.com/150"
              minWidth={["60%", "40%", "30%", "20%"]}
              maxWidth="20%"
              borderRadius="10"
              mr={{ xl: "40px", lg: "45px", md: "0", base: "0" }}
              mb={{ base: "15px" }}
              ml={{ xl: "20px" }}
            />
            <Box>
              <TableContainer
                whiteSpace="pre-wrap"
                display="flex"
                flexDirection="column"
                m="15px auto"
              >
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>TITLE</Th>
                      <Td> {report[0].title}</Td>
                    </Tr>
                    <Tr>
                      <Th>DESCRIPTION</Th>
                      <Td textAlign="left" maxWidth="300px">
                        {report[0].description}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th>PRIORITY</Th>
                      <Td>{report[0].priority}</Td>
                    </Tr>
                    <Tr>
                      <Th>NAME</Th>
                      <Td>
                        {report[0].name} {report[0].lastname}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th>EMAIL</Th>
                      <Td>{report[0].email}</Td>
                    </Tr>
                    <Tr>
                      <Th>STATE</Th>
                      <Td>{report[0].state}</Td>
                    </Tr>
                  </Thead>
                </Table>
                <Box mt={7} mb={5} ml="auto" mr="auto">
                  {report && <Chat report={report[0]} />}
                </Box>
              </TableContainer>
            </Box>
          </Box>
          <Box m="20px auto">
            <Maps location={report[0].coord} />
          </Box>
        </Box>
        <Footer />
      </>
    );
  }
};

export default ReportDataById;
