import {
  Box,
  Button,
  Heading,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Maps from "../commons/Maps";

const SingleReport = () => {
  const [report, setReport] = useState({});
  const params = useParams();

  useEffect(() => {
    axios
      .get(`/api/report/getreportbyid/${params.id}`)
      .then((res) => setReport(res.data[0]));
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      w={["92%", "90%", "80%","70%"]}
      mx={["4%", "7%", "10%","15%"]}
    >
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
          minWidth={["60%", "50%", "50%", "20%"]}
          maxWidth="90%"
          borderRadius="10"
        />
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
      <Box display="flex" flexDirection="row" alignItems="flex-start">
        <Link to="/admin/reports">
          <Button m="3" borderRadius="40px">
            Atrás
          </Button>
        </Link>
        <Button
          m="3"
          borderRadius="40px"
          bg="secondary"
          _hover={{ bg: "fourth" }}
        >
          Aceptar
        </Button>
      </Box>
    </Box>
  );
};

export default SingleReport;
