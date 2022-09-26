import React from "react";
import QRscanner from "./QrScanner";
import { Provider } from "react-redux";
import store from "../state/store";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript, Input } from "@chakra-ui/react";
import theme from "../styles/theme";
import { myNewTheme } from "../styles/theme";
import { screen, userEvent } from "@storybook/testing-library";

export default {
  title: "QR",
  component: QRscanner,
};
const Template = (args) => (
  <BrowserRouter>
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={myNewTheme}>
        <QRscanner />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);

export const Default = Template.bind({});
