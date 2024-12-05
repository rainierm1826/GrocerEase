import { createSlice } from "@reduxjs/toolkit";

export const adminSidebarSlice = createSlice({
  name: "adminSidebar",
  initialState: {
    open: false,
  },

  reducers: {
    openAdminSidebar: (state, action) => {
      state.open = action.payload;
    },

    closeAdminSidebar: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { openAdminSidebar, closeAdminSidebar } =
  adminSidebarSlice.actions;
export default adminSidebarSlice.reducer;
