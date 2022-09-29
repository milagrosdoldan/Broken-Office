import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

export const signUp = createAsyncThunk("SIGN_UP", async (user) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/user/register",
      user,
      { withCredentials: true }
    );
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

const registerReducer = createReducer([], {
  [signUp.fulfilled]: (state, action) => action.payload,
});

export default registerReducer;
