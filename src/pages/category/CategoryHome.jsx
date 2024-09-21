import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductsByCategoryAction } from "../../features/products/productAction";
import { getACategoryAction } from "../../features/categories/catAction";
import { Row, Col, Spinner } from "react-bootstrap";
import ProductCard from "../../components/home/ProductCard";

const CategoryHome = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productInfo);
  const { category } = useSelector((state) => state.catInfo);

  useEffect(() => {
    dispatch(getProductsByCategoryAction(slug));
    dispatch(getACategoryAction(slug));
  }, [dispatch, slug]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">{category.title || "Products"}</h1>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Row className="justify-content-center">
          {products.length > 0 ? (
            products.map((product) => (
              <Col key={product._id} md={6} lg={4} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <p>No products available for this category.</p>
          )}
        </Row>
      )}
    </div>
  );
};

export default CategoryHome;
