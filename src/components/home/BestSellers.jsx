import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Pagination } from "react-bootstrap";
import ProductCard from "./ProductCard";
import LoadingCard from "../card/LoadingCard";
import { fetchProductsAction } from "../../features/products/productAction";

const BestSellers = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productInfo
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    dispatch(fetchProductsAction("sold", "desc", itemsPerPage * currentPage));
  }, [dispatch, currentPage]);

  const sortedProducts = [...products].sort((a, b) => b.sold - a.sold);

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
      <h2 className="text-center mb-4 text-2xl font-semibold">Best Sellers</h2>
      {loading ? (
        <LoadingCard count={itemsPerPage} />
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <div key={product._id} className="mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
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
        </>
      )}
    </Container>
  );
};

export default BestSellers;
