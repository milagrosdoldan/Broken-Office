import React from "react";
import { Home } from "./Home";
import { Provider } from "react-redux";
import store from "../state/store";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript, Input } from "@chakra-ui/react";
import theme from "../styles/theme";
import { myNewTheme } from "../styles/theme";

import { screen, userEvent } from "@storybook/testing-library";

export default {
  title: "Home",
  component: Home,
};

const Template = (args) => (
  <BrowserRouter>
    <Provider store={store}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={myNewTheme}>
        <Home />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);

export const Default = Template.bind({});

export const FilledForm = Template.bind({});
FilledForm.play = async () => {
  const titleInput = screen.getByPlaceholderText("Title", {
    selector: <Input />,
  });

  await userEvent.type(titleInput, "Mouse roto.", {
    delay: 100,
  });

  const roleInput = screen.getByPlaceholderText("Company role", {
    selector: <Input />,
  });

  await userEvent.type(roleInput, "Desarrolladora", {
    delay: 100,
  });

  const descriptionInput = screen.getByPlaceholderText("Description", {
    selector: <Input />,
  });

  await userEvent.type(
    descriptionInput,
    "Se cayo agua en el mouse y no funciona",
    {
      delay: 100,
    }
  );

  const priority = screen.getByTestId("priority", {
    selector: <Input />,
  });

  await userEvent.selectOptions(priority, "High", {
    delay: 100,
  });
  const imageSrc = screen.getByTestId("image", {
    selector: <Input />,
  });

  await userEvent.type(imageSrc, "/home/mdoldan/Descargas/imagen.jpeg", {
    delay: 100,
  });

  // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
};
