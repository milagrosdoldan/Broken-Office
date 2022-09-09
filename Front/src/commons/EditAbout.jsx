import React, { useEffect } from "react";
import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { sendMe } from "../state/user";

const EditAbout = () => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [email, setEmail] = useState(user.email);
  const [tel, setTel] = useState("");
  const [companyRol, setCompanyRol] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sendMe());
  }, []);

  const updateUser = (event) => {
    event.preventDefault();
    console.log(user);
    const newData = {
      email,
      tel,
      companyRol,
    };
    axios.put(`/api/user/${user.id}`, newData).then((res) => {
      dispatch();
    });
    onClose();
  };

  const handlerEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlerTel = (e) => {
    setTel(e.target.value);
  };
  const handlerRol = (e) => {
    setCompanyRol(e.target.value);
  };

  return (
    <>
      <EditIcon onClick={onOpen} />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit About</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt="5">
              <FormLabel>Edit Email</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Email"
                value={email}
                onChange={handlerEmail}
                _focusVisible={{ borderColor: "secondary" }}
                _hover={{ color: "secondary" }}
                isRequired
              />
              <FormLabel>Edit Phone</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Tel"
                value={tel}
                onChange={handlerTel}
                _focusVisible={{ borderColor: "secondary" }}
                _hover={{ color: "secondary" }}
              />
              <FormLabel>Edit Company Rol</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Rol"
                _focusVisible={{ borderColor: "secondary" }}
                _hover={{ color: "secondary" }}
                value={companyRol}
                onChange={handlerRol}
              />

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  type="submit"
                  mr={3}
                  color=""
                  borderRadius="40px"
                  bg="secondary"
                  _hover={{ bg: "fourth" }}
                  onClick={updateUser}
                >
                  Save
                </Button>
                <Button onClick={onClose} borderRadius="40px">
                  Cancel
                </Button>
              </ModalFooter>
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditAbout;
