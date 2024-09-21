import { apiProcessor } from "../../services/axios";

const reviewEP = import.meta.env.VITE_APP_SERVR_ROOT + "/api/v1/reviews";

export const postNewReview = async (obj) => {
  const axiosObj = {
    method: "post",
    url: reviewEP,
    data: obj,
    isPrivate: true,
  };
  return apiProcessor(axiosObj);
};

export const updateReview = async (obj) => {
  const axiosObj = {
    method: "patch",
    url: reviewEP,
    data: obj,
    isPrivate: true,
  };
  return apiProcessor(axiosObj);
};

export const fetchReviews = async (isPrivate) => {
  const axiosObj = {
    method: "get",
    url: isPrivate ? reviewEP + "/all" : reviewEP,
    isPrivate,
  };
  return apiProcessor(axiosObj);
};

// Fetch reviews by product ID
export const fetchReviewsByProductId = async (productId) => {
  const axiosObj = {
    method: "get",
    url: `${reviewEP}/product/${productId}`,
    isPrivate: true,
  };

  const response = await apiProcessor(axiosObj);
  if (response.status === "success") {
    response.reviews.sort((a, b) => b.rating - a.rating);
  }
  return response;
};
