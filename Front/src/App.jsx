import * as React from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
