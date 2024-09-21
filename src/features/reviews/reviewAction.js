import {
  fetchReviews,
  fetchReviewsByProductId,
  postNewReview,
  updateReview,
} from "./reviewAxios";
import { toast } from "react-toastify";
import {
  setAllReview,
  setAverageRating,
  setProductReviews,
  setPubReviews,
  updateReveiwStatus,
} from "./reviewSlice";

export const addNewReviewAction = (obj) => async (dispatch) => {
  try {
    const pending = postNewReview(obj);

    toast.promise(pending, {
      pending: "Please wait...",
    });

    const { status, message } = await pending;

    toast[status](message);

    if (status === "success") {
      dispatch(getReviews(false)); // Refresh public reviews
      return true;
    }
  } catch (error) {
    toast.error("Error adding review: " + error.message);
  }
};

export const updateReviewAction = (obj) => async (dispatch) => {
  try {
    const pending = updateReview(obj);

    toast.promise(pending, {
      pending: "Please wait...",
    });

    const { status, message } = await pending;

    toast[status](message);

    if (status === "success") {
      dispatch(updateReveiwStatus(obj));
    }
  } catch (error) {
    toast.error("Error updating review: " + error.message);
  }
};

// Get reviews
export const getReviewsAction = (isPrivate) => async (dispatch) => {
  try {
    const { status, reviews } = await fetchReviews(isPrivate);

    if (status) {
      isPrivate
        ? dispatch(setAllReview(reviews))
        : dispatch(setPubReviews(reviews));
    }
  } catch (error) {
    toast.error("Error fetching reviews: " + error.message);
  }
};

// Calculate average rating
// Calculate average rating
const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return totalRating / reviews.length;
};

// Get reviews by product ID
export const getReviewsByProductIdAction = (productId) => async (dispatch) => {
  try {
    const { status, reviews } = await fetchReviewsByProductId(productId);

    if (status) {
      const averageRating = calculateAverageRating(reviews);
      dispatch(setProductReviews(reviews));
      dispatch(setAverageRating(averageRating));
    }
  } catch (error) {
    toast.error("Error fetching product reviews: " + error.message);
  }
};
