import { createSlice } from "@reduxjs/toolkit";

export const addProductSlice = createSlice({
  name: "addProduct",
  initialState: {
    open: false,
  },

  reducers: {
    openAddProduct: (state, action) => {
      state.open = action.payload;
    },

    closeAddProduct: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { openAddProduct, closeAddProduct } = addProductSlice.actions;
export default addProductSlice.reducer;
