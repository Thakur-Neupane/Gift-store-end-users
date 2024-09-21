import React from "react";
import StarRatings from "react-star-ratings";

const SafeStarRatings = ({
  rating = 0,
  starRatedColor = "gold",
  starEmptyColor = "gray",
  starDimension = "20px",
  starSpacing = "3px",
  isSelectable = false,
}) => {
  try {
    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
      console.error("Invalid rating value:", rating);
      return <div>Error displaying ratings</div>;
    }
    return (
      <StarRatings
        rating={numericRating}
        starRatedColor={starRatedColor}
        starEmptyColor={starEmptyColor}
        starDimension={starDimension}
        starSpacing={starSpacing}
        isSelectable={isSelectable}
      />
    );
  } catch (error) {
    console.error("StarRatings Error:", error);
    return <div>Error displaying ratings</div>;
  }
};

export default SafeStarRatings;
