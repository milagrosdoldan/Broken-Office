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

const userReducer = createReducer([], {
  [signUp.fulfilled]: (state, action) => action.payload,
  [logIn.fulfilled]: (state, action) => action.payload,
});
export default userReducer;
