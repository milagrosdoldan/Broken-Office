import {
  createReducer,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export const signUp = createAsyncThunk("SIGN_UP", async (user) => {
  const res = await axios.post("/api/user/register", user);
  return res.data;
});

export const logIn = createAsyncThunk("LOG_IN", async (user) => {
  const res = await axios.post("/api/user/login", user);
  return res.data;
});

export const sendMe = createAsyncThunk("SEND_ME", async () => {
  const res = await axios.get("/api/user/me");
  return res.data;
});

export const logOut = createAsyncThunk("LOG_OUT", async () => {
  const res = await axios.post("/api/user/logout");
  return res.data;
});

export const ubication = createAsyncThunk("UBICATION", async () => {
  
});

const userReducer = createReducer([], {
  [signUp.fulfilled]: (state, action) => action.payload,
  [logIn.fulfilled]: (state, action) => action.payload,
  [sendMe.fulfilled]: (state, action) => action.payload,
  [logOut.fulfilled]: (state, action) => action.payload,
});

export default userReducer;
