import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const productIndex = state.findIndex(
        (product) => product._id === action.payload._id
      );

      if (productIndex > -1) {
        state[productIndex].count += action.payload.count;
      } else {
        state.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    updateCartProductColor(state, action) {
      const { _id, color } = action.payload;
      const existingProduct = state.find((item) => item._id === _id);
      if (existingProduct) {
        existingProduct.color = color;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    updateCartProductCount(state, action) {
      const { _id, count } = action.payload;
      const product = state.find((product) => product._id === _id);
      if (product) {
        product.count = count;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    removeProduct(state, action) {
      const updatedState = state.filter(
        (product) => product._id !== action.payload._id
      );
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },

    // Action to clear the cart, if needed
    clearCart(state) {
      localStorage.removeItem("cart");
      return [];
    },
  },
});

export const {
  addToCart,
  updateCartProductColor,
  updateCartProductCount,
  removeProduct,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
