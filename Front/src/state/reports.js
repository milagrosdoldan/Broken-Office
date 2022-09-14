import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const sendReport = createAsyncThunk("SEND_REPORT", async (data) => {
  const res = await axios.post("/api/report/addreport", data);
  return res.data;
});

export const myReport = createAsyncThunk("MY_REPORT", async () => {
  const res = await axios.get(`/api/report/myreports`);
  return res.data;
});

const reportReducer = createReducer(
  {},
  {
    [sendReport.fulfilled]: (state, action) => action.payload,
    [myReport.fulfilled]: (state, action) => action.payload,
  }
);

export default reportReducer;
