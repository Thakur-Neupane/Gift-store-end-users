import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySubCategoryAction } from "../../features/products/productAction";
import ProductCard from "../../components/home/ProductCard";
import { Container, Row, Col, Alert } from "react-bootstrap";

const SubCategory = () => {
  const { subCategoryId } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productInfo
  );

  useEffect(() => {
    dispatch(getProductsBySubCategoryAction(subCategoryId));
  }, [dispatch, subCategoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <Container className="my-4">
      <h1>Products</h1>
      {products.length === 0 ? (
        <Alert variant="info">No products found under this category.</Alert>
      ) : (
        <Row>
          {products.map((product) => (
            <Col
              key={product._id}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className="mb-4"
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SubCategory;
