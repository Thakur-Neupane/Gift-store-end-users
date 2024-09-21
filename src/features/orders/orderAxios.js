import { apiProcessor } from "../../services/axios";

const orderEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/orders";

// Create a new order
export const createOrder = (paymentIntentId, userId) => {
  const obj = {
    url: `${orderEP}/createOrder`,
    method: "post",
    data: {
      paymentIntentId,
      userId,
    },
    isPrivate: true,
  };

  return apiProcessor(obj);
};
