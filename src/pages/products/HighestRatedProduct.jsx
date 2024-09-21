import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductAction } from "../../features/products/productAction";
import { getReviewsByProductIdAction } from "../../features/reviews/reviewAction";
import ProductCard from "../../components/home/ProductCard";

const HighestRatedProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productInfo
  );
  const { productReviews } = useSelector((state) => state.reviewInfo);
  const [productsWithRatings, setProductsWithRatings] = useState([]);

  useEffect(() => {
    dispatch(getProductAction());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched Products:", products);
    if (products.length > 0) {
      products.forEach((product) => {
        dispatch(getReviewsByProductIdAction(product._id));
      });
    }
  }, [dispatch, products]);

  useEffect(() => {
    console.log("Fetched Product Reviews:", productReviews);
    if (products.length > 0 && productReviews.length > 0) {
      const productsWithRatings = products.map((product) => {
        const reviews = productReviews.filter(
          (review) => review.productId === product._id
        );
        const averageRating = calculateAverageRating(reviews);
        return { ...product, averageRating };
      });

      const sortedProducts = productsWithRatings
        .sort((a, b) => b.averageRating - a.averageRating)
        .filter((product) => product.averageRating > 0)
        .slice(0, 20);

      setProductsWithRatings(sortedProducts);
    }
  }, [products, productReviews]);

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Highest Rated Products</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {productsWithRatings.length > 0 ? (
          productsWithRatings.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div>No products available</div>
        )}
      </div>
    </div>
  );
};

export default HighestRatedProducts;
