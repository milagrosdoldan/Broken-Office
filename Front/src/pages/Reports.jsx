import {
  Box,
  IconButton,
  Input,
  Spinner,
  Tab,
  TabList,
  Tabs,
  useColorMode,
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
import { SearchIcon } from "@chakra-ui/icons";
import Footer from "../components/Footer";
const Reports = () => {
  const [reports, setReports] = useState([]);
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    allReports();
  }, []);

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

  async function allReports() {
    axios
      .get("http://localhost:3001/api/report/getpendingreports", {
        withCredentials: true,
      })
      .then((res) => {
        setReports(res.data);
        setIsLoading(false);
        console.log(reports);
      })
      .catch((err) => console.log(err));
  }

  const handlerReports = (e) => {
    const value = e.target.value;

    if (value === "PENDING") {
      axios
        .get("http://localhost:3001/api/report/getpendingreports", {
          withCredentials: true,
        })
        .then((res) => {
          setReports(res.data);
           if (isLoading) {
             if (user) {
               user.isAdmin ? allReports() : navigate("/404");
             }
            return <Spinner size="xl" color="secondary" ml="50%" my="10%" />;
          }
        });
    }

    if (value === "FULFILLED") {
      axios
        .get("http://localhost:3001/api/report/getsolvedreports", {
          withCredentials: true,
        })
        .then((res) => {
          setReports(res.data);
        });
    }
    if (value === "REJECTED") {
      axios
        .get("http://localhost:3001/api/report/getrejectedreports", {
          withCredentials: true,
        })
        .then((res) => {
          setReports(res.data);
        });
    }
  };

  const handlerSearch = async (data) => {
    const reportes = await axios.get(
      `http://localhost:3001/api/report/search/${data.search}`,
      { withCredentials: true }
    );
    setReports(reportes.data);
  };

  if (isLoading) {
    if (user.length) {
      user.isAdmin ? allReports() : navigate("/404");
    }
    return <Spinner size="xl" color="secondary" ml="50%" my="10%" />;
  }

  return (
    <>
      <Box
        h={{ xl: "110vh", lg: "110vh", md: "75vh", base: "110vh" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box mt="5" display="flex" flexDir={"row"} alignItems="center">
          <Input
            borderColor={colorMode === "light" ? "third" : "white"}
            placeholder="Search reports..."
            _focusVisible={{ borderColor: "third" }}
            {...register("search")}
          />
          <IconButton
            onClick={handleSubmit(handlerSearch)}
            aria-label="Search database"
            mt="0px"
            borderRadius={50}
            ml={3}
            icon={<SearchIcon />}
          />
        </Box>

        <Tabs m="3">
          <TabList m="15px 0 auto" display="flex" justifyContent="center">
            <Tab
              value={"PENDING"}
              _selected={{ color: "white", bg: "gray" }}
              onClick={handlerReports}
            >
              In Progress
            </Tab>
            <Tab
              value={"REJECTED"}
              _selected={{ color: "white", bg: "red" }}
              onClick={handlerReports}
            >
              Rejected
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
      <Footer />
    </>
  );
};
console.log("🚀 ~ file: Reports.jsx ~ line 173 ~ Reports ~ Input", Input);
console.log("🚀 ~ file: Reports.jsx ~ line 173 ~ Reports ~ Input", Input);

export default Reports;
