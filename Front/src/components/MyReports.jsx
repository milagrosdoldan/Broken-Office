import { Box, Heading, Tab, TabList, Tabs } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import ReportList from "../commons/ReportList";
import Footer from "./Footer";

const MyReports = () => {
  const [reports, setReports] = useState();

  const handlerReports = (e) => {
    const value = e.target.value;

    if (value === "PENDING") {
      axios.get("http://localhost:3001/api/report/catchedreports", { withCredentials: true }).then((res) => {
        setReports(res.data);
      });
    }
    if (value === "FULFILLED") {
      console.log("fulfil");
      axios.get("http://localhost:3001/api/report/myreportsfullfilled", { withCredentials: true }).then((res) => {
        setReports(res.data);
      });
    }
    if (value === "REJECTED") {
      axios.get("http://localhost:3001/api/report/myreportsrejected", { withCredentials: true }).then((res) => {
        setReports(res.data);
      });
    }
  };

  return (
    <>
      <Box h={{ xl: "65vh", lg: "60vh", md: "70vh", base: "67.5vh" }}>
        <Heading textAlign={"center"} m="5">
          My reports
        </Heading>
        <Tabs m="3">
          <TabList display="flex" justifyContent="center">
            <Tab
              value={"REJECTED"}
              _selected={{ color: "white", bg: "red" }}
              onClick={handlerReports}
            >
              Rejected
            </Tab>
            <Tab
              value={"PENDING"}
              _selected={{ color: "white", bg: "gray" }}
              onClick={handlerReports}
            >
              In Progress
            </Tab>
            <Tab
              value={"FULFILLED"}
              _selected={{ color: "white", bg: "secondary" }}
              onClick={handlerReports}
            >
              Fulfilled
            </Tab>
          </TabList>
        </Tabs>
        <ReportList reports={reports} />
      </Box>
      <Footer />
    </>
  );
};

export default MyReports;
