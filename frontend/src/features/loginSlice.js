import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    open: false,
  },

  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },

    setClose: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen, setClose } = loginSlice.actions;
export default loginSlice.reducer;
