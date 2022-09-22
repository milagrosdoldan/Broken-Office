import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const ReportList = ({ reports }) => {
  return (
    <TableContainer
      mt="10"
      m="0 auto"
      width={["100%", "70%", "60%"]}
      display="flex"
      alignItems="center"
      p="2"
      fontSize={["18", "18"]}
    >
      <Table size="s">
        <Thead>
          <Tr>
            <Th textAlign="left">ID</Th>
            <Th textAlign="left">TITLE</Th>
            <Th textAlign="left"> NAME</Th>
            <Th textAlign="left"> INFO</Th>
          </Tr>
        </Thead>
        <Tbody>
          {reports?.length > 0 ? (
            reports.map((report) => (
              <Tr key={report._id}>
                <Td textAlign="left">{report._id.slice(0, 5)}</Td>
                <Td textAlign="left"> {report.title}</Td>
                <Td textAlign="left">
                  {report.name} {report.lastname}
                </Td>
                <Td textAlign="center">
                  <Link to={`/admin/reports/${report._id}`}>
                    <Button
                      bg="secondary"
                      textAlign="center"
                      size="sm"
                      mt={2}
                      mb={2}
                      color="black"
                      borderRadius="40px"
                    >
                      +
                    </Button>
                  </Link>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td>No reports.</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ReportList;
