import { applyCoupon } from "./couponAxios";
import {
  applyCouponRequest,
  applyCouponSuccess,
  applyCouponFailure,
  setOriginalCartTotal,
  clearCouponState,
} from "./couponSlice";

export const applyCouponAction =
  ({ couponCode, cartTotal, userId }) =>
  async (dispatch, getState) => {
    const { appliedCoupon, originalCartTotal } = getState().couponInfo;

    if (appliedCoupon === couponCode) {
      console.log("This coupon is already applied.");
      return;
    }

    dispatch(applyCouponRequest());

    try {
      // Reset coupon state if a new coupon is being applied
      dispatch(clearCouponState());

      const response = await applyCoupon(couponCode, cartTotal);

      if (response.status === "success") {
        if (!originalCartTotal) {
          dispatch(setOriginalCartTotal(cartTotal));
        }

        dispatch(
          applyCouponSuccess({
            totalAfterDiscount: response.totalAfterDiscount,
            coupon: couponCode,
          })
        );
      } else {
        throw new Error("Failed to apply coupon");
      }
    } catch (error) {
      dispatch(applyCouponFailure(error.message));
    }
  };

// Get all coupons action
export const getAllCouponsAction = () => async (dispatch) => {
  try {
    const response = await getAllCoupons();

    if (response.status === "success") {
      dispatch(setCoupons(response.coupons));
    }
  } catch (error) {
    console.error("Error fetching coupons:", error);
  }
};

// Get a single coupon action
export const getCouponAction = (couponId) => async (dispatch) => {
  try {
    const response = await getACoupon(couponId);

    if (response.status === "success") {
      dispatch(setCoupon(response.coupon));
    }
  } catch (error) {
    console.error("Error fetching coupon:", error);
  }
};

// Update coupon action
export const updateCouponAction = (couponId, coupon) => async (dispatch) => {
  try {
    const response = await updateCoupon(couponId, coupon);

    if (response.status === "success") {
      dispatch(getAllCouponsAction()); // Refresh coupons after update
      return true;
    }
  } catch (error) {
    console.error("Error updating coupon:", error);
  }
};
