import { userEvent } from "@storybook/testing-library";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { render, fireEvent, screen } from "../test-utils";
import Login from "./Login";

describe("Login", () => {
  let componente;
  test("Render Login", () => {
    componente = render(
      <BrowserRouter>
        <Routes>
          <Route path="http://localhost:6006/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  });
});
