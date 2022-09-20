import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  IconButton,
  Input,
  Spinner,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import ReportList from "../commons/ReportList";
const Reports = () => {
  const [reports, setReports] = useState([]);
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    async function cleanInputs() {
      if (isSubmitSuccessful) {
        reset({
          search: "",
        });
      }
    }
    cleanInputs();
  }, [formState, reset]);
  const navigate = useNavigate();

  async function allReports() {
    axios
      .get("/api/report/getpendingreports")
      .then((res) => {
        setReports(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  const handlerReports = (e) => {
    const value = e.target.value;

    if (value === "PENDING") {
      axios.get("/api/report/getpendingreports").then((res) => {
        setReports(res.data);
      });
    }
    if (value === "FULLFIELD") {
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

  const handlerSearch = async (data) => {
    const reportes = await axios.get(`/api/report/search/${data.search}`);
    setReports(reportes.data);
  };

  if (isLoading) {
    user?.isAdmin ? allReports() : navigate("/404");
    return <Spinner size="xl" color="secondary" ml="50%" my="10%" />;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box mt="5" display="flex" flexDir={"row"} alignItems="center">
        <Input
          placeholder="Search reports..."
          _focusVisible={{ borderColor: "third" }}
          {...register("search")}
        />
        <IconButton
          onClick={handleSubmit(handlerSearch)}
          aria-label="Search database"
          mt="0px"
          icon={<SearchIcon />}
        />
      </Box>

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
      <div>
        <ScrollToTop
          smooth
          color="black"
          bg="#bfd732 "
          style={{
            backgroundColor: "#bfd732",
            width: "10",
            borderRadius: "15px",
          }}
        />
      </div>
    </Box>
  );
};

export default Reports;
