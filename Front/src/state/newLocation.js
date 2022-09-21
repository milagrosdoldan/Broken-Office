import { createReducer, createAction } from "@reduxjs/toolkit";

export const setNewUbication = createAction("SET_NEW_UBICATION");

const newLocationReducer = createReducer(
  {},
  {
    [setNewUbication]: (state, action) => action.payload,
  }
);
export default newLocationReducer;
