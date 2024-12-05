import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import userReducer from "./userSlice";
import accountOptionReducer from "./accountOptions";
import sidebarReducer from "./sidebarSlice";
import addProductReducer from "../admin/features/addProductSlice";
import productReducer from "../features/productSlice";
import searchReducer from "../features/searchSlice";
import adminSidebarReducer from "../admin/features/adminSidebarSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    accountOption: accountOptionReducer,
    sidebar: sidebarReducer,
    adminSidebar: adminSidebarReducer,
    addProduct: addProductReducer,
    product: productReducer,
    search: searchReducer,
  },
});
