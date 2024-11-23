import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import userReducer from "./userSlice";
import accountOptionReducer from "./accountOptions";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    accountOption: accountOptionReducer,
  },
});
