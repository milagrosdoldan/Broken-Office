import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { render, fireEvent, screen } from "../test-utils";
import { onSubmit } from "./Register";
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

  test("onClick event on SUBMIT button", () => {
    const component = render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const boton = component.getByText("Submit");
    fireEvent.click(boton);
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
