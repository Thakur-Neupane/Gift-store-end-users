import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coupons: [], // List of available coupons
  appliedCoupon: null, // Currently applied coupon
  originalCartTotal: null, // Original cart total before any discount
  totalAfterDiscount: null, // Total amount after applying the coupon
  applyCouponLoading: false, // Loading state for applying coupon
  applyCouponError: null, // Error state for applying coupon
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    setCoupons: (state, { payload = [] }) => {
      state.coupons = payload;
    },
    setOriginalCartTotal: (state, { payload }) => {
      state.originalCartTotal = payload;
    },
    setAppliedCoupon: (state, { payload }) => {
      state.appliedCoupon = payload;
    },
    applyCouponRequest: (state) => {
      state.applyCouponLoading = true;
      state.applyCouponError = null;
    },
    applyCouponSuccess: (state, { payload }) => {
      state.totalAfterDiscount = payload.totalAfterDiscount;
      state.appliedCoupon = payload.coupon;
      state.applyCouponLoading = false;
    },
    applyCouponFailure: (state, { payload }) => {
      state.applyCouponLoading = false;
      state.applyCouponError = payload;
    },
    clearCouponState: (state) => {
      state.appliedCoupon = null;
      state.totalAfterDiscount = null;
      state.applyCouponLoading = false;
      state.applyCouponError = null;
    },
  },
});

const { reducer, actions } = couponSlice;

export const {
  setCoupons,
  setOriginalCartTotal,
  setAppliedCoupon,
  applyCouponRequest,
  applyCouponSuccess,
  applyCouponFailure,
  clearCouponState,
} = actions;

export default reducer;
