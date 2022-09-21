import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Register from "./pages/Register";
import Reports from "./pages/Reports";
import { setUbication } from "./state/location";
import { sendMe } from "./state/user";
import SingleReport from "./components/SingleReport";
import ResolveReport from "./commons/ResolveReport";
import MyReports from "./components/MyReports";
import ReportDataById from "./commons/ReportDataById";
import NotFound from "./pages/NotFound";
import Chat from "./components/Chat";
import Users from "./components/Users";
import UserData from "./commons/UserData";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function persistence() {
      dispatch(sendMe());

      function success(pos) {
        dispatch(setUbication([pos.coords.latitude, pos.coords.longitude]));
      }
      navigator.geolocation.getCurrentPosition(success);
    }
    persistence();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile" element={<Perfil />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/report/:id" element={<ReportDataById />}></Route>
        <Route path="/admin/reports" element={<Reports />}></Route>
        <Route path="/admin/myreports" element={<MyReports />}></Route>
        <Route path="/user/:id" element={<UserData/>}></Route>
        <Route path="/admin/reports/:id" element={<SingleReport />}></Route>
        <Route
          path="/admin/reports/resolve/:id"
          element={<ResolveReport />}
        ></Route>
        <Route path="/admin/users" element={<Users />}></Route>
        <Route path="/404" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
