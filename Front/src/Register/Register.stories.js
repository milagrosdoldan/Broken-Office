import React from "react";
import Register from "./Register";
import { Provider } from "react-redux";
import store from "../state/store";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript, Input } from "@chakra-ui/react";
import theme from "../styles/theme";
import { myNewTheme } from "../styles/theme";

import { screen, userEvent } from "@storybook/testing-library";

export default {
  title: "Register",
  component: Register,
};

const Template = (args) => (
  <BrowserRouter>
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={myNewTheme}>
        <Register />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);

export const Default = Template.bind({});

export const FilledForm = Template.bind({});
FilledForm.play = async () => {
  const nameInput = screen.getByPlaceholderText("Name", {
    selector: <Input />,
  });

  await userEvent.type(nameInput, "Martin", {
    delay: 100,
  });

  const lastnameInput = screen.getByPlaceholderText("Lastname", {
    selector: <Input />,
  });

  await userEvent.type(lastnameInput, "Paez", {
    delay: 100,
  });

  const emailInput = screen.getByPlaceholderText("Email", {
    selector: <Input />,
  });

  await userEvent.type(emailInput, "martin-paez@gmail.com", {
    delay: 100,
  });

  const passwordInput = screen.getByPlaceholderText("Enter password", {
    selector: <Input />,
  });

  await userEvent.type(passwordInput, "ExamplePassword.", {
    delay: 100,
  });
  // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
  const submitButton = screen.getByText("Submit");

  await userEvent.click(submitButton);
};
