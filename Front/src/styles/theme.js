import { extendTheme } from "@chakra-ui/react";

export const myNewTheme = extendTheme({
  colors: {
    primary: "#FFFFFF", //blanco
    secondary: "#BFD732", //verde 
    third: "#444444", //gris
  },
  fonts: {
    heading: `'Heebo', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
});
