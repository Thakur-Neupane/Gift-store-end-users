import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import subCatReducer from "../features/subcategories/subCatSlice";
import systemReducer from "./systemSlice";
import catReducer from "../features/categories/catSlice";
import productReducer from "../features/products/productSlice";
import reviewReducer from "../features/reviews/reviewSlice";
import cartReducer from "../features/cart/cartSlice";
import drawerReducer from "../features/cart/drawerSlice";
import checkoutReducer from "../features/checkout/checkoutSlice";
import couponReducer from "../features/coupons/couponSlice";
import stripeReducer from "../features/stripe/stripeSlice";
import orderReducer from "../features/orders/orderSlice";

const store = configureStore({
  reducer: {
    userInfo: userReducer,
    system: systemReducer,
    catInfo: catReducer,
    subCatInfo: subCatReducer,
    productInfo: productReducer,
    reviewInfo: reviewReducer,
    cartInfo: cartReducer,
    drawerInfo: drawerReducer,
    couponInfo: couponReducer,
    checkoutInfo: checkoutReducer,
    stripeInfo: stripeReducer,
    orderInfo: orderReducer,
  },
});

export default store;
