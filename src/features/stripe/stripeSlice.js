import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientSecret: "",
  cartTotal: 0,
  totalAfterDiscount: 0,
  payable: 0,
};

const stripeSlice = createSlice({
  name: "stripe",
  initialState,
  reducers: {
    setPaymentClientSecret: (state, { payload }) => {
      state.clientSecret = payload.clientSecret;
      state.cartTotal = payload.cartTotal;
      state.totalAfterDiscount = payload.totalAfterDiscount;
      state.payable = payload.payable;
    },
  },
});

const { reducer, actions } = stripeSlice;
export const { setPaymentClientSecret } = actions;
export default reducer;
