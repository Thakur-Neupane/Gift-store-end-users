import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  cart: null,
  loading: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    saveOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    saveOrderSuccess: (state, { payload }) => {
      state.loading = false;
      state.order = payload;
    },
    saveOrderFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    fetchCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCartSuccess: (state, { payload }) => {
      state.loading = false;
      state.cart = payload;
    },
    fetchCartFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    deleteCartsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteCartsSuccess: (state) => {
      state.loading = false;
      state.cart = null;
    },
    deleteCartsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    updateAddressRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateAddressSuccess: (state, { payload }) => {
      state.loading = false;
      state.cart = payload; // Update the cart with new address
    },
    updateAddressFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
const { reducer, actions } = checkoutSlice;
export const {
  saveOrderRequest,
  saveOrderSuccess,
  saveOrderFailure,
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  deleteCartsRequest,
  deleteCartsSuccess,
  deleteCartsFailure,
  updateAddressRequest,
  updateAddressSuccess,
  updateAddressFailure,
} = actions;
export default reducer;
