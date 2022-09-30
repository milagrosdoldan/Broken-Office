import React from "react";
import Login from "./Login";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript, Input } from "@chakra-ui/react";
import store from "../state/store";
import theme from "../styles/theme";
import { myNewTheme } from "../styles/theme";
import { screen, userEvent } from "@storybook/testing-library";
import { linkTo } from "@storybook/addon-links";
export default {
  title: "Login",
  component: Login,
};

const Template = (args) => (
  <BrowserRouter>
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={myNewTheme}>
        <Login />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);

export const Default = Template.bind({});

export const FilledForm = Template.bind({});
FilledForm.play = async () => {
  const emailInput = screen.getByPlaceholderText("Email", {
    selector: <Input />,
  });

  await userEvent.type(emailInput, "martin-paez@gmail.com", {
    delay: 100,
  });

  const passwordInput = screen.getByPlaceholderText("Password", {
    selector: <Input />,
  });

  await userEvent.type(passwordInput, "ExamplePassword.", {
    delay: 100,
  });
  // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
  const submitButton = screen.getByText("Submit");

  await userEvent.click(submitButton);
};
