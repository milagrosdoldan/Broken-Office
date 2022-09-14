import { Badge, Box, Stack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import ReportList from "../commons/ReportList";
import NotFound from "./NotFound";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function allReports() {
      axios
        .get("/api/report/allreports")
        .then((res) => {
          setReports(res.data);
        })
        .catch((err) => console.log(err));
    }
    allReports();
  }, []);

  const handlerReports = (e) => {
    const value = e.target.outerText;

    if (value === "PENDING") {
      axios.get("/api/report/getpendingreports").then((res) => {
        setReports(res.data);
      });
    }
    if (value === "FULFILLED") {
      axios.get("/api/report/getsolvedreports").then((res) => {
        setReports(res.data);
      });
    }
    if (value === "REJECTED") {
      axios.get("/api/report/getrejectedreports").then((res) => {
        setReports(res.data);
      });
    }
  };
  if (user.isAdmin) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Stack direction="row" alignItems="center" m="1">
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
        </Stack>
        <ReportList reports={reports}/>
        <div>
          
          <ScrollToTop
            smooth
            color="black"
            bg="#bfd732 "
            style={{
              backgroundColor: "#bfd732",
              width: "10",
              borderRadius:"15px",
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
