import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProductRating = ({ rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starRating = index + 1;
    if (rating >= starRating) {
      return (
        <FaStar key={index} style={{ color: "#f5c518", fontSize: "20px" }} />
      );
    } else if (rating >= starRating - 0.5) {
      return (
        <FaStarHalfAlt
          key={index}
          style={{ color: "#f5c518", fontSize: "20px" }}
        />
      );
    } else {
      return (
        <FaRegStar key={index} style={{ color: "#f5c518", fontSize: "20px" }} />
      );
    }
  });

  return <div style={{ display: "flex" }}>{stars}</div>;
};

export default ProductRating;
