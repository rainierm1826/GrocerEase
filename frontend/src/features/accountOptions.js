import { createSlice } from "@reduxjs/toolkit";

export const accountOptionsSlice = createSlice({
  name: "accountOptions",
  initialState: {
    open: false,
  },

  reducers: {
    openAccountOptions: (state, action) => {
      state.open = action.payload;
    },

    closeAccountOptions: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { openAccountOptions, closeAccountOptions } =
  accountOptionsSlice.actions;
export default accountOptionsSlice.reducer;
