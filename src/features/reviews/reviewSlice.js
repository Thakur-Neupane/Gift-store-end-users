// reviewSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pubReviews: [],
  allReviews: [],
  productReviews: [],
  averageRating: 0, // New state slice for average rating
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setPubReviews: (state, { payload }) => {
      state.pubReviews = payload || [];
    },
    setAllReview: (state, { payload }) => {
      state.allReviews = payload;
    },
    updateReveiwStatus: (state, { payload }) => {
      const { _id, status } = payload;
      state.allReviews = state.allReviews.map((item) => {
        if (item._id === _id) {
          return { ...item, status };
        }
        return item;
      });
    },
    setProductReviews: (state, { payload }) => {
      state.productReviews = payload || [];
    },
    setAverageRating: (state, { payload }) => {
      state.averageRating = payload;
    },
  },
});

const { reducer, actions } = reviewSlice;

export const {
  setPubReviews,
  setAllReview,
  updateReveiwStatus,
  setProductReviews,
  setAverageRating,
} = actions;
export default reducer;
