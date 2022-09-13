import * as React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { myNewTheme } from "./styles/theme";
import { Provider } from "react-redux";
import store from "./state/store";
import * as serviceWorker from "./serviceWorker"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ChakraProvider theme={myNewTheme}>
        <App />
      </ChakraProvider>
    </Provider>
  </BrowserRouter>
);

serviceWorker.register()