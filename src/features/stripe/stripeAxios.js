import axios from "axios";

const stripeEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/payment";

export const createPaymentIntent = async (userId, cart, coupon) => {
  try {
    const response = await axios.post(`${stripeEP}/create-payment-intent`, {
      userId,
      cart,
      couponApplied: coupon,
    });
    return response;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};
