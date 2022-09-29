import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import locationReducer from "./location";
import registerReducer from "./register";
import reportReducer from "./reports";
import userReducer from "./user";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    registro: registerReducer,
    user: userReducer,
    location: locationReducer,
    report: reportReducer,
  },
});

export default store;
