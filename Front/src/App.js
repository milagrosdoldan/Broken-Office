import * as React from "react";
import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
