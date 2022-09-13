import {
  Badge,
  Box,
  Button,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import NotFound from "./NotFound";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/report/allreports")
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlerReports = (e) => {
    const value = e.target.outerText;

    if (value === "PENDING") {
      axios.get("http://localhost:3001/api/report/getpendingreports").then((res) => {
        setReports(res.data);
      });
    }
    if (value === "FULFILLED") {
      axios.get("http://localhost:3001/api/report/getsolvedreports").then((res) => {
        setReports(res.data);
      });
    }
    if (value === "REJECTED") {
      axios.get("http://localhost:3001/api/report/getrejectedreports").then((res) => {
        setReports(res.data);
      });
    }
  };
  if (user.isAdmin) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Stack direction="row" alignItems="center" m="1">
          <Badge
            key={"fullfilled"}
            my="5"
            colorScheme="green"
            px="7"
            py="4"
            borderRadius="10px"
            onClick={handlerReports}
          >
            Fulfilled
          </Badge>
          <Badge
            key={"pending"}
            px="7"
            py="4"
            borderRadius="10px"
            my="5"
            onClick={handlerReports}
          >
            Pending
          </Badge>
          <Badge
            key={"rejected"}
            my="5"
            colorScheme="red"
            px="7"
            py="4"
            borderRadius="10px"
            onClick={handlerReports}
          >
            Rejected
          </Badge>
        </Stack>
        <TableContainer
          mt="10"
          m={["1", "15", "20", "100"]}
          width={["100%", "70%"]}
        >
          <Table size="s">
            <Thead>
              <Tr>
                <Th textAlign="center">ID</Th>
                <Th textAlign="center">DESCRIPTION</Th>
                <Th textAlign="center"> NAME</Th>
              </Tr>
            </Thead>
            <Tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <Tr key={report._id}>
                    <Td textAlign="center">{report._id.slice(0, 5)}</Td>
                    <Td textAlign="center">
                      {" "}
                      {report.description.slice(0, 13)}
                    </Td>
                    <Td textAlign="center">
                      {report.name} {report.lastname}
                    </Td>
                    <Td textAlign="center">
                      <Link to={`/admin/reports/${report._id}`}>
                        <Button
                          borderRadius="40px"
                          bg="secondary"
                          _hover={{ bg: "fourth" }}
                        >
                          Ver
                        </Button>
                      </Link>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Text textAlign="center">No reports.</Text>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        <div>
          <ScrollToTop
            smooth
            color="black"
            bg="#bfd732 "
            style={{
              backgroundColor: "#bfd732",
              width: "10",
            }}
          />
        </div>
      </Box>
    );
  } else {
    return <NotFound />;
  }
};

export default Reports;
