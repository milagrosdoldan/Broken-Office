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
import { Link, useParams } from "react-router-dom";
import Chat from "../components/Chat";
import Footer from "../components/Footer";
import Maps from "./Maps";

const ReportDataById = () => {
  const { id } = useParams();
  const [report, setReport] = useState();

  useEffect(() => {
    async function oneProduct() {
      axios
        .get(`http://localhost:3001/api/report/getreportbyid/${id}`, { withCredentials: true })
        .then((result) => setReport(result.data[0]));
    }
    oneProduct();
  }, []);

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
            Your report:
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
              src={report.image}
              alt="photo of the report"
              fallbackSrc="https://via.placeholder.com/150"
              minWidth={["60%", "40%", "30%", "20%"]}
              maxWidth="20%"
              borderRadius="10"
              mr={{ xl: "45px", lg: "45px", md: "0", base: "0" }}
              mb={{ base: "15px" }}
            />
            <Box>
              <Text
                ml={{ xl: "68px", lg: "58px", md: 3.5, base: 3.5 }}
                fontWeight="bold"
                fontSize={25}
              >
                {report.title}
              </Text>

              <Text
                ml={{ xl: "68px", lg: "58px", md: 3.5, base: 3.5 }}
                fontWeight="bold"
              >
                Description:
              </Text>
              <Text
                maxWidth="300px"
                ml={{ xl: "68px", lg: "58px", md: 3.5, base: 3.5 }}
              >
                {report.description}
              </Text>
              <TableContainer
                ml={{ xl: "55px", lg: "45px", md: "0", base: "0" }}
              >
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
                <Box mt={17} ml="100px">
                  <Chat report={report} />
                </Box>
              </TableContainer>
            </Box>
          </Box>
          <Box ml={{ xl: 30, lg: 30, md: 30, base: "-50px" }}>
            <Maps location={report.coord} />
          </Box>
        </Box>
        <Footer />
      </>
    );
  }
};

export default ReportDataById;
