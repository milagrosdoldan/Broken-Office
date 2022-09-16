import { createReducer, createAction } from "@reduxjs/toolkit";

export const setPhoto = createAction("SET_PHOTO");

const photoReducer = createReducer("", {
  [setPhoto]: (state, action) => action.payload,
});
export default photoReducer;
