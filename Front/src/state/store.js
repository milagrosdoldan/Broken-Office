import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import locationReducer from "./location";
import newLocationReducer from "./newLocation";
import reportReducer from "./reports";
import userReducer from "./user";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    location: locationReducer,
    report: reportReducer,
    newUbication: newLocationReducer,
  },
});

export default store;
