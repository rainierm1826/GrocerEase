import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProduct: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
    },
  },
});

export const { setProduct, setLogout, setError, setLoading } =
  productSlice.actions;
export default productSlice.reducer;
