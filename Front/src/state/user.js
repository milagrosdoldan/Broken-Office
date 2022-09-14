import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// CommonJS.
export const signUp = createAsyncThunk("SIGN_UP", async (user) => {
  try {
    const res = await axios.post("/api/user/register", user);
    return res.data;
  } catch {
    Swal.fire({
      text: "Datos inválidos.",
      width: 400,
      showConfirmButton: false,
      timer: 1500,
      color: "secondary",
    });
  }
});

export const logIn = createAsyncThunk("LOG_IN", async (user) => {
  try {
    const res = await axios.post("/api/user/login", user);
    return res.data;
  } catch {
    Swal.fire({
      text: "Datos incorrectos.",
      width: 400,
      showConfirmButton: false,
      timer: 1500,
      color: "secondary",
    });
  }
});

export const sendMe = createAsyncThunk("SEND_ME", async () => {
  const res = await axios.get("/api/user/me");
  return res.data;
});

export const logOut = createAsyncThunk("LOG_OUT", async () => {
  const res = await axios.post("/api/user/logout");
  return res.data;
});

export const update = createAsyncThunk("UPDATE", async (data, thunk) => {
  const { user } = thunk.getState();
  return axios.put(`/api/user/${user.id}`, data).data;
});

const userReducer = createReducer([], {
  [signUp.fulfilled]: (state, action) => action.payload,
  [logIn.fulfilled]: (state, action) => action.payload,
  [sendMe.fulfilled]: (state, action) => action.payload,
  [logOut.fulfilled]: (state, action) => action.payload,
  [update.fulfilled]: (state, action) => action.payload,
});

export default userReducer;
