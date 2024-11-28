import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    open: false,
  },

  reducers: {
    openSidebar: (state, action) => {
      state.open = action.payload;
    },

    closeSidebar: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
