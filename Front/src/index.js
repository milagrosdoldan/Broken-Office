import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { myNewTheme } from "./styles/theme";

ReactDOM.render(
  <BrowserRouter>
    <ChakraProvider theme={myNewTheme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
