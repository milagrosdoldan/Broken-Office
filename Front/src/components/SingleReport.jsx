import {
  Box,
  Button,
  Heading,
  Image,
  Table,
  TableContainer,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ResolveReport from "../commons/ResolveReport";
import NotFound from "../pages/NotFound";
import ReportData from "../commons/ReportData";

const SingleReport = () => {
  const [report, setReport] = useState({});
  console.log("🚀 ~ file: SingleReport.jsx ~ line 25 ~ SingleReport ~ report", report)
  const params = useParams();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/report/getreportbyid/${params.id}`)
      .then((res) => setReport(res.data[0]));
  }, [report.admin]);

  const acceptReport = async (e) => {
    try {
      axios.put(`/api/report/catchreport/${params.id}`, {
        admin: `${user.name} ${user.lastname}`,
      });
      Swal.fire({
        icon: "success",
        text: "Reporte aceptado",
        width: 400,
        showConfirmButton: false,
        timer: 1500,
        color: "secondary",
      });
      axios
        .get(`/api/report/getreportbyid/${params.id}`)
        .then((res) => setReport(res.data[0]));
    } catch {
      console.log("ERROR REPORT");
    }
  };
  const resolveReport = () => {
    navigate(`/admin/reports/resolve/${params.id}`);
  };

  if (user.isAdmin) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        w={["92%", "90%", "80%", "70%"]}
        mx={["4%", "7%", "10%", "15%"]}
      >
        <ReportData report={report} />

        <Box display="flex" flexDirection="row" alignItems="center">
          <Link to="/admin/reports">
            <Button m="3" borderRadius="40px">
              Atrás
            </Button>
          </Link>
          {!report.admin ? (
            <Button
              m="3"
              borderRadius="40px"
              bg="secondary"
              _hover={{ bg: "fourth" }}
              onClick={acceptReport}
            >
              Aceptar
            </Button>
          ) : (
            (report.state === "pending")?
            <Button
              m="3"
              borderRadius="40px"
              bg="secondary"
              _hover={{ bg: "fourth" }}
              onClick={resolveReport}
            >
              Resolve Report
            </Button>
            : <Button borderRadius="40px" colorScheme={(report.state === "solved")? "green" : "red"}>{report.state}</Button>
          )}
        </Box>
      </Box>
    );
  } else {
    return <NotFound />;
  }
};

export default SingleReport;
