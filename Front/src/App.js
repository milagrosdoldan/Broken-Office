import * as React from "react";
import { Route, Routes } from "react-router";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default App;
