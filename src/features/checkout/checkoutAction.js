import {
  deleteCarts,
  getCartByUserId,
  saveOrder,
  updateCartAddress,
} from "./checkoutAxios";
import {
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
} from "./checkoutSlice";

export const saveOrderAction = (orderData) => async (dispatch) => {
  dispatch(saveOrderRequest());

  try {
    const response = await saveOrder(orderData);
    if (response.status === "success") {
      dispatch(saveOrderSuccess(response.order));
    } else {
      throw new Error("Failed to save order");
    }
  } catch (error) {
    dispatch(saveOrderFailure(error.message));
  }
};

export const fetchCartByUserIdAction = (userId) => async (dispatch) => {
  dispatch(fetchCartRequest());

  try {
    const response = await getCartByUserId(userId);

    if (response.status === "success") {
      dispatch(fetchCartSuccess(response.cart));
    } else {
      throw new Error(
        "Failed to fetch cart. Response status: " + response.status
      );
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    dispatch(fetchCartFailure(error.message));
  }
};

// Action creator for deleting all carts
export const deleteCartsAction = () => async (dispatch) => {
  dispatch(deleteCartsRequest());

  try {
    const response = await deleteCarts();

    if (response.status === "success") {
      dispatch(deleteCartsSuccess());
    } else {
      throw new Error("Failed to delete carts");
    }
  } catch (error) {
    dispatch(deleteCartsFailure(error.message));
  }
};

export const updateCartAddressAction =
  (userId, addressData) => async (dispatch) => {
    dispatch(updateAddressRequest());

    try {
      const response = await updateCartAddress(userId, addressData);
      if (response.status === "success") {
        dispatch(updateAddressSuccess(response.cart));
      } else {
        throw new Error("Failed to update address");
      }
    } catch (error) {
      dispatch(updateAddressFailure(error.message));
    }
  };
