import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const sendReport = createAsyncThunk("SEND_REPORT", async (data) => {
  const res = await axios.post("http://localhost:3001/api/report/addreport", data);
  return res.data;
});

const reportReducer = createReducer(
  {},
  {
    [sendReport.fulfilled]: (state, action) => action.payload,
  }
);

export default reportReducer;
