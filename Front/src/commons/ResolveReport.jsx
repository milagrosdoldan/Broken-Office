import { Box, Button, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import ReportData from "./ReportData";
import SendEmail from "./SendEmail";

const ResolveReport = () => {
  const [report, setReport] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function getReportbyId() {
      axios
        .get(`/api/report/getreportbyid/${params.id}`)
        .then((res) => setReport(res.data[0]));
    }
    getReportbyId();
  }, []);

  const rejectedReport = (e) => {
    axios.put(`/api/report/rejectedreport/${params.id}`).then(() => {
      Swal.fire({
        icon: "error",
        text: "Reporte rechazado",
        width: 400,
        showConfirmButton: false,
        timer: 1500,
        color: "secondary",
      });
      navigate("/admin/reports");
    });
  };
  const resolveReport = async () => {
    try {
      await axios.put(`/api/report/solvereport/${params.id}`);
      Swal.fire({
        icon: "success",
        text: "Reporte resuelto",
        width: 400,
        showConfirmButton: false,
        timer: 1500,
        color: "secondary",
      });
      navigate("/admin/reports");
    } catch {
      console.error("no se pudo resolver");
    }
  };
  return (
    <>
      <Heading mt={5} textAlign="center">
        Resolve Report
      </Heading>
      <ReportData report={report} />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button
          m="3"
          colorScheme="red"
          borderRadius="40px"
          onClick={rejectedReport}
        >
          Reject
        </Button>
        <Button
          m="3"
          borderRadius="40px"
          bg="secondary"
          _hover={{ bg: "fourth" }}
          onClick={resolveReport}
        >
          Resolve
        </Button>
        <SendEmail report={report} />
      </Box>
      <Link to="/admin/reports">
        <Button>Back</Button>
      </Link>
    </>
  );
};

export default ResolveReport;
