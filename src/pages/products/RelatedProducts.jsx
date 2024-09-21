import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/home/ProductCard";
import { fetchSimilarProductsAction } from "../../features/products/productAction";

const RelatedProducts = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const similarProducts = useSelector(
    (state) => state.productInfo.similarProducts
  );

  useEffect(() => {
    dispatch(fetchSimilarProductsAction(_id));
  }, [_id, dispatch]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Similar Products</h2>
      {similarProducts && similarProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {similarProducts.map((similarProduct) => (
            <div key={similarProduct._id} className="mb-4">
              <ProductCard product={similarProduct} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No similar products found.</p>
      )}
    </div>
  );
};

export default RelatedProducts;
