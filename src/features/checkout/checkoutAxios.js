import { apiProcessor } from "../../services/axios";
import axios from "axios";

const checkoutEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/checkout";

export const saveOrder = (orderData) => {
  return apiProcessor({
    url: checkoutEP,
    method: "post",
    data: orderData,
    isPrivate: true,
  });
};

export const getCartByUserId = (userId) => {
  return apiProcessor({
    url: `${checkoutEP}/${userId}`,
    method: "get",
    isPrivate: true,
  });
};

// Axios function to delete all carts
export const deleteCarts = () => {
  return apiProcessor({
    url: checkoutEP,
    method: "delete",
    isPrivate: true,
  });
};

export const updateCartAddress = (userId, addressData) => {
  return axios({
    url: `${checkoutEP}/update-address/${userId}`,
    method: "put",
    data: addressData,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
