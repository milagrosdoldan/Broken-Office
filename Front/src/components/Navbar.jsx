import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Spacer,
  Image,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../state/user";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="lg"
      rounded="sm"
      bg="white"
    >
      <Menu bg="red">
        <Link to="/">
          <Image
            boxSize="100px"
            objectFit="cover"
            alt="Globant logo"
            minW={"fit-content"}
            ml="10px"
            src="https://emprendedoresnews.com/wp-content/uploads/2020/01/company_5d7c04ad08a25a53fd4d5987.png"
          ></Image>
        </Link>
        <MenuButton
          rightIcon={<ChevronDownIcon />}
          mr={5}
          bg="secondary"
          _hover={{ bg: "fourth" }}
          as={Button}
        >
          <HamburgerIcon />
        </MenuButton>

        {user.email ? (
          <MenuList>
            <MenuItem>Perfil</MenuItem>
            <MenuItem
              onClick={() => {
                handleLogOut();
                toast({
                  title: "Closed account.",

                  status: "success",
                  duration: 4000,
                  isClosable: true,
                });
              }}
            >
              Log Out
            </MenuItem>
          </MenuList>
        ) : (
          <MenuList>
            <Link to="/login">
              {" "}
              <MenuItem>Log In</MenuItem>{" "}
            </Link>
            <Link to="/register">
              {" "}
              <MenuItem>Register</MenuItem>{" "}
            </Link>
          </MenuList>
        )}
      </Menu>
    </Box>
  );
};

export default Navbar;
