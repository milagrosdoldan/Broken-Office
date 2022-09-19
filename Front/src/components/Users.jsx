import {
  Spinner,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const getUsers = () => {
    axios.get("/api/admin/all").then((res) => {
      setUsers(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getUsers();
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
          axios.put(`/api/admin/demote/${id}`);
        } else {
          axios.put(`/api/admin/promote/${id}`);
        }
        getUsers();
        Swal.fire("Updated!", "User has been updated.", "success");
      }
    });
  };

  if (isLoading) {
    user?.isAdmin ? getUsers() : navigate("/404");
    return <Spinner size="xl" color="secondary" ml="50%" my="10%" />;
  }

  return (
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
      <Table size="s">
        <Thead>
          <Tr>
            <Th textAlign="start" py="5">
              NAME
            </Th>
            <Th textAlign="start" py="5" pr="5">
              ACTIVE
            </Th>
            <Th textAlign="start" py="5">
              ROLE
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user) => (
            <Tr key={user.id}>
              <Td textAlign="start" py="5">
                {user.name} {user.lastname}
              </Td>
              <Td textAlign="start" py="5">
                {user.active ? "Active" : "No Active"}
              </Td>
              <Td textAlign="start" py="5">
                {user.isAdmin ? "Admin" : "User"}
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
    </TableContainer>
  );
};

export default Users;
