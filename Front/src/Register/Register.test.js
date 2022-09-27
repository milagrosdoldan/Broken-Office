import { userEvent } from "@storybook/testing-library";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { render, fireEvent, screen } from "../test-utils";

import Register from "./Register";

describe("Register", () => {
  let componente;
  test("Render Register", () => {
    componente = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  });
  test("Includes Register Title", () => {
    componente = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const titulo = componente.getByText("Register");
    console.log(titulo);
  });
});
