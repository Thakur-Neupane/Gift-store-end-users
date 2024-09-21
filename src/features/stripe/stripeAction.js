import { createPaymentIntent } from "./stripeAxios";
import { setPaymentClientSecret } from "./stripeSlice";

export const createPaymentIntentAction =
  (userId, cart, coupon) => async (dispatch) => {
    try {
      const response = await createPaymentIntent(userId, cart, coupon);

      if (response.data && response.data.clientSecret) {
        dispatch(setPaymentClientSecret(response.data));
        return true;
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };
