// AverageRating.js

import React from "react";
import StarRatings from "react-star-ratings";

const AverageRating = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return (
      <div className="text-center pt-1 pb-3">
        <span>No ratings yet</span>
      </div>
    );
  }

  // Calculate the average rating
  const totalRating = ratings.reduce(
    (sum, review) => sum + (review.rating || 0),
    0
  );
  const averageRating = (totalRating / ratings.length).toFixed(1);

  return (
    <div className="text-center pt-1 pb-3">
      <StarRatings
        rating={parseFloat(averageRating)}
        starRatedColor="gold" // Color for the filled stars
        starEmptyColor="gray" // Color for the empty stars
        starDimension="20px" // Size of the stars
        starSpacing="3px" // Spacing between stars
        numberOfStars={5} // Total number of stars
        name="rating"
      />
      <span className="ml-2">{averageRating} / 5</span>
    </div>
  );
};

export default AverageRating;
