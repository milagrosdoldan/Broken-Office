import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import axios from "axios";

export const idReport = createAsyncThunk("ID_REPORT", async (id) => {
  const res = await axios.get(
    `http://localhost:3001/api/report/getreportbyid/${id}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
});

const myReportReducer = createReducer(
  {},
  {
    [idReport.fulfilled]: (state, action) => action.payload,
  }
);

export default myReportReducer;
