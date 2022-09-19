import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { sendMe } from "../state/user";
import axios from "axios";

const EditAbout = () => {
  const user = useSelector((state) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const [input, setInput] = useState(null);
  const finalRef = React.useRef(null);
  const [email, setEmail] = useState(user.email);
  const [tel, setTel] = useState(user.tel);
  const [companyRole, setCompanyRole] = useState(user.companyRole);
  const [imageSrc, setImageSrc] = useState();
  const dispatch = useDispatch();
  console.log(imageSrc);

  const updateUser = (event) => {
    event.preventDefault();

    const newData = {
      tel,
      companyRole,
      picture: imageSrc,
    };
    console.log(newData);
    axios.put(`/api/user/${user.id}`, newData);

    dispatch(sendMe());
    onClose();
  };
  const handlerEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlerTel = (e) => {
    setTel(e.target.value);
  };
  const handlerRole = (e) => {
    setCompanyRole(e.target.value);
  };

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

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
            <FormControl>
              <FormLabel mb={imageSrc || user.picture ? -3 : 3}>
                Photo:
              </FormLabel>
              <Box
                mb={imageSrc || user.picture ? -7 : "none"}
                justifyContent="space-between"
                alignItems="center"
                display="flex"
                flexDirection="row"
              >
                <Input
                  key={input || ""}
                  w={imageSrc || user.picture ? 60 : "full"}
                  type="file"
                  onChange={handleOnChange}
                />
                {user.picture && (
                  <>
                    <Image
                      mt={3}
                      borderRadius="60px"
                      alt="your post image"
                      src={user.picture}
                      maxWidth="20%"
                      maxHeight="10%"
                      alignSelf="center"
                    />
                    <Button
                      onClick={() => {
                        let randomString = Math.random().toString(36);
                        setInput(randomString);
                        setImageSrc("");
                      }}
                    >
                      {" "}
                      x{" "}
                    </Button>
                  </>
                )}
                {imageSrc && (
                  <>
                    <Image
                      mt={3}
                      borderRadius="60px"
                      alt="your post image"
                      src={imageSrc}
                      maxWidth="20%"
                      maxHeight="10%"
                      alignSelf="center"
                    />
                    <Button
                      onClick={() => {
                        let randomString = Math.random().toString(36);
                        setInput(randomString);
                        setImageSrc("");
                      }}
                    >
                      {" "}
                      x{" "}
                    </Button>
                  </>
                )}
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel mt={4}>Email:</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Email"
                value={email}
                onChange={handlerEmail}
                _focusVisible={{ borderColor: "third" }}
                _hover={useColorModeValue("black", "white")}
                isRequired
              />
              <FormLabel mt={4}>Phone:</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Tel"
                value={tel}
                onChange={handlerTel}
                _focusVisible={{ borderColor: "third" }}
                _hover={useColorModeValue("black", "white")}
              />
              <FormLabel mt={4}>Company Role:</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Rol"
                _focusVisible={{ borderColor: "third" }}
                _hover={useColorModeValue("black", "white")}
                value={companyRole}
                onChange={handlerRole}
              />

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  type="submit"
                  mr={3}
                  color=""
                  borderRadius="40px"
                  bg="secondary"
                  _hover={useColorModeValue("black", "white")}
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

/*  {imageSrc ||
                  (user.picture && (
                    <>
                      <Image
                        mt={3}
                        borderRadius="60px"
                        alt="your post image"
                        src={imageSrc || user.picture}
                        maxWidth="20%"
                        maxHeight="10%"
                      />
                      <Button
                        onClick={() => {
                          let randomString = Math.random().toString(36);
                          setInput(randomString);
                          setImageSrc("");
                        }}
                      >
                        {" "}
                        x{" "}
                      </Button>
                    </>*/
