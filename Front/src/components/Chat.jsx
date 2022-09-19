import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { db } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import {
  Drawer,
  Button,
  Box,
  Stack,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Chat = ({ report }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const { id } = useParams();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      let filterMessages = messages.filter(
        (message) => message.reportId === id
      );

      setMessages(filterMessages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Button
        bg="secondary"
        _hover={{ bg: "fourth" }}
        textAlign="center"
        mt={15}
        colorScheme="teal"
        onClick={onOpen}
      >
        Send Messages
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Chat</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                {messages &&
                  messages.map((message) => (
                    <Message
                      key={message.id}
                      message={message}
                      scroll={scroll}
                    />
                  ))}
              </Box>
            </Stack>
            <span ref={scroll}></span>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <SendMessage scroll={scroll} report={report} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Chat;
