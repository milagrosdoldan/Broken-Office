import React from "react";
import ReportDataById from "./ReportDataById";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript, Input } from "@chakra-ui/react";
import store from "../state/store";
import theme from "../styles/theme";
import { myNewTheme } from "../styles/theme";

export default {
  title: "Single Report",
  component: ReportDataById,
};

const Template = (args) => (
  <BrowserRouter>
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={myNewTheme}>
        <ReportDataById />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);
export const Default = Template.bind({});
