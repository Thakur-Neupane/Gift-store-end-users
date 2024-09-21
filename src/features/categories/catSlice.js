import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cats: [],
  category: {}, // Store category details
};

const catSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCats: (state, { payload = [] }) => {
      state.cats = payload;
    },
    setCategory: (state, { payload }) => {
      state.category = payload;
    },
  },
});

const { reducer, actions } = catSlice;

export const { setCats, setCategory } = actions;

export default reducer;
