import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, { payload }) => {
      state.loading = false;
      state.order = payload;
      state.error = null;
    },
    createOrderFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    clearOrder: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
});

const { reducer, actions } = orderSlice;

export const {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  clearOrder,
} = actions;

export default reducer;
