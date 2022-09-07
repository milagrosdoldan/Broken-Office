import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { myNewTheme } from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider theme={myNewTheme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);

