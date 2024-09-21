import { createOrder } from "./orderAxios";
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  clearOrder,
} from "./orderSlice";

// Action creator to create a new order
export const createOrderAction =
  (paymentIntentId, userId) => async (dispatch) => {
    dispatch(createOrderRequest());
    try {
      const response = await createOrder(paymentIntentId, userId);
      if (response.status === "success") {
        dispatch(createOrderSuccess(response.order));
      } else {
        dispatch(createOrderFailure("Failed to create order"));
      }
    } catch (error) {
      dispatch(createOrderFailure(error.message));
      console.error("Error creating order:", error);
    }
  };

// Action creator to clear the order state
export const clearOrderAction = () => (dispatch) => {
  dispatch(clearOrder());
};
