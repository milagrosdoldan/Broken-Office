import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import "../style/login.css";
const style = {
  message: `flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
  name: `absolute mt-[-4rem] text-gray-600 text-xs`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full`,
};

const Message = ({ message, scroll }) => {
  const user = useSelector((state) => state.user);
  const messageClass = message.userId === user.id ? `sent` : `receive`;

  useEffect(() => {
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <Box>
      <Box className={`messages ${messageClass}`}>
        <Text mt={1} mr={3} ml={3} color="third">
          {message.name}
        </Text>
        <Text ml={3} mr={3} pb={2}>
          {message.text}
        </Text>
      </Box>
    </Box>
  );
};

export default Message;
