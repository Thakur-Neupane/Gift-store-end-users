import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    similarProducts: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSimilarProducts: (state, action) => {
      state.similarProducts = action.payload;
    },
  },
});

export const {
  setProducts,
  setProduct,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSimilarProducts,
} = productSlice.actions;

export default productSlice.reducer;
