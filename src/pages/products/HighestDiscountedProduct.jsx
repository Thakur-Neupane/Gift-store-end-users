import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Pagination } from "react-bootstrap";
import ProductCard from "../../components/home/ProductCard";
import { fetchProductsAction } from "../../features/products/productAction";

const HighestDiscountedProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productInfo);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchProductsAction("price", "desc", itemsPerPage * currentPage));
  }, [dispatch, currentPage]);

  // Calculate discount and sort products by discount in descending order
  const productsWithDiscount = products.map((product) => {
    const discount =
      product.price && product.salesPrice
        ? ((product.price - product.salesPrice) / product.price) * 100
        : 0;
    return { ...product, discount };
  });

  const sortedProducts = [...productsWithDiscount].sort(
    (a, b) => b.discount - a.discount
  );

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((i) => i + 1);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 text-2xl font-semibold">
        Products on Sale
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination className="justify-center mt-4 flex">
          {pageNumbers.map((number) => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </Container>
  );
};

export default HighestDiscountedProducts;
