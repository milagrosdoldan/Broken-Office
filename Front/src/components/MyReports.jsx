import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import ReportList from "../commons/ReportList";

const MyReports = () => {
  const [reports, setReports] = useState();

  useEffect(() => {
    async function allReports() {
      axios.get("/api/report/catchedreports").then((res) => {
        setReports(res.data);
      });
    }
    allReports();
  }, []);

  return <ReportList reports={reports} />;
};

export default MyReports;
