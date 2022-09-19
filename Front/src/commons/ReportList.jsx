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
      m={["1", "15", "20", "100"]}
      width={["100%", "70%", "60%"]}
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
          {reports?.length > 0 ? (
            reports.map((report) => (
              <Tr key={report._id}>
                <Td textAlign="center">{report._id.slice(0, 5)}</Td>
                <Td textAlign="center"> {report.description.slice(0, 13)}</Td>
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
