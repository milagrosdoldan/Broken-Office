import React from "react";

import { Provider } from "react-redux";
import store from "../state/store";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript, Input } from "@chakra-ui/react";
import theme from "../styles/theme";
import { myNewTheme } from "../styles/theme";

import { screen, userEvent } from "@storybook/testing-library";
import NotFound from "./NotFound";

export default {
  title: "404 Not found",
  component: NotFound,
};

export const Template = (args) => (
  <BrowserRouter>
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={myNewTheme}>
        <NotFound />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);
