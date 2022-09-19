import {
  Heading,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import ReportList from "../commons/ReportList";

const MyReports = () => {
  const [reports, setReports] = useState();

  const handlerReports = (e) => {
    const value = e.target.value;

    if (value === "PENDING") {
      axios.get("/api/report/catchedreports").then((res) => {
        setReports(res.data);
      });
    }
    if (value === "FULLFIELD") {
      console.log("fulfil");
      axios.get("/api/report/myreportsfullfilled").then((res) => {
        setReports(res.data);
      });
    }
    if (value === "REJECTED") {
      axios.get("/api/report/myreportsrejected").then((res) => {
        setReports(res.data);
      });
    }
  };

  return (
    <>
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
            value={"FULLFIELD"}
            _selected={{ color: "white", bg: "secondary" }}
            onClick={handlerReports}
          >
            Fullfield
          </Tab>
        </TabList>
      </Tabs>
      <ReportList reports={reports} />
    </>
  );
};

export default MyReports;
