import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Spinner,
  Switch,
  Tab,
  Table,
  TableContainer,
  TabList,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "./Footer";

const Users = () => {
  const user = useSelector((state) => state.user);
  console.log("🚀 ~ file: Users.jsx ~ line 30 ~ Users ~ user", user);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm();
  const filteredUsers = () => users.slice(currentPage, currentPage + 5);
  const nextPage = () => {
    if (currentPage + 5 <= users.length) setCurrentPage(currentPage + 5);
  };
  const prevPage = () =>
    currentPage > 0 ? setCurrentPage(currentPage - 5) : setCurrentPage(0);

  useEffect(() => {
    async function cleanInputs() {
      if (isSubmitSuccessful) {
        reset({
          search: "",
        });
        setCurrentPage(0);
      }
    }
    cleanInputs();
  }, [formState, reset]);

  const getAllUsers = () => {
    axios.get(`http://localhost:3001/api/user/allUsers/${"USER"}`, { withCredentials: true }).then((res) => {
      setUsers(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handlerAdmin = (id, isAdmin) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "tomato",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (isAdmin) {
          axios.put(`http://localhost:3001/api/admin/demote/${id}`, { withCredentials: true });
        } else {
          axios.put(`http://localhost:3001/api/admin/promote/${id}`, { withCredentials: true });
        }
        getAllUsers();
        Swal.fire("Updated!", "User has been updated.", "success");
      }
    });
  };

  const handlerSearch = async (data) => {
    const reportes = await axios.get(`http://localhost:3001/api/user/search/${data.search}`, { withCredentials: true });
    setUsers(reportes.data);
  };

  const handlerReports = (e) => {
    const value = e.target.value;
    axios.get(`http://localhost:3001/api/user/allUsers/${value}`, { withCredentials: true }).then((res) => {
      setUsers(res.data);
    });
  };

  // if (isLoading) {
  //   user?.isAdmin ? getAllUsers() : navigate("/404");
  //   return <Spinner size="xl" color="secondary" ml="50%" my="10%" />;
  // }

  return (
    <>
      <Box h={{ xl: "95vh", lg: "100vh", md: "95vh", base: "90vh" }}>
        <TableContainer
          mt="10"
          width={["100%", "70%", "60%"]}
          display="flex"
          flexDir={"column"}
          alignItems="center"
          m="0 auto"
          p="2"
          fontSize={["18", "18"]}
        >
          <Box my="5" display="flex" flexDir={"row"} alignItems="center">
            <Input
              placeholder="Search users..."
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
            <TabList m="0 auto" display="flex" justifyContent="center">
              <Tab
                value={"USER"}
                _selected={{ color: "white", bg: "gray" }}
                onClick={handlerReports}
              >
                USERS
              </Tab>
              <Tab
                value={"ADMIN"}
                _selected={{ color: "white", bg: "secondary" }}
                onClick={handlerReports}
              >
                ADMINS
              </Tab>
            </TabList>
          </Tabs>
          <Table size="s">
            <Thead>
              <Tr>
                <Th textAlign="start" py="5">
                  NAME
                </Th>
                <Th textAlign="start" py="5" pr="5">
                  ACTIVE
                </Th>
                <Th textAlign="end" py="5" pr="5">
                  ADMIN
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers()?.map((user) => (
                <Tr key={user.id}>
                  <Td _hover={{ color: "fourth" }} textAlign="start" py="5">
                    <Link
                      style={{ textDecoration: "underline" }}
                      to={`/user/${user.id}`}
                    >
                      {" "}
                      {user.name} {user.lastname}
                    </Link>
                  </Td>

                  <Td textAlign="start" py="5">
                    {user.active ? "Active" : "No Active"}
                  </Td>
                  <Td textAlign="end" py="5">
                    <Switch
                      onChange={() => handlerAdmin(user.id, user.isAdmin)}
                      colorScheme="whatsapp"
                      size="lg"
                      isChecked={user.isAdmin}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box>
            <Button
              alt="previus page"
              bg="secondary"
              ml={5}
              mt={15}
              color="black"
              onClick={prevPage}
            >
              <ArrowBackIcon />
            </Button>
            <Button
              alt="next page"
              bg="secondary"
              ml={5}
              color="black"
              mt={15}
              onClick={nextPage}
            >
              <ArrowForwardIcon />
            </Button>
          </Box>
        </TableContainer>
      </Box>
      <Footer />
    </>
  );
};

export default Users;
