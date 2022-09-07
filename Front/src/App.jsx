import * as React from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/perfil" element={<Perfil />}></Route>
      </Routes>
    </>
  );
}

export default App;
