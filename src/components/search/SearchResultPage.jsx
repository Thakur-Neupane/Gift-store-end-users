import React, { useState, useEffect, useCallback, useContext } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../home/ProductCard";
import Sidebar from "./SideBar";
import debounce from "lodash.debounce";
import { SearchContext } from "./SearchContext"; // Adjust path as necessary

const SearchResultsPage = () => {
  const [filters, setFilters] = useState({
    price: [0, 1000],
    rating: null,
    category: null,
    subcategory: null,
    latestArrival: false,
  });
  const { query } = useContext(SearchContext); // Get query from context
  const [filteredProducts, setFilteredProducts] = useState([]);

  const products = useSelector((state) => state.productInfo.products);
  const categories = useSelector((state) => state.catInfo.cats);
  const subCategories = useSelector((state) => state.subCatInfo.subCats);

  // Debounced search function to improve performance
  const searchProducts = useCallback(
    debounce((query) => {
      const lowerCaseQuery = query.toLowerCase();

      // Find matching categories and subcategories based on the query
      const matchingCategories = categories
        .filter((cat) => cat.title.toLowerCase().includes(lowerCaseQuery))
        .map((cat) => cat._id);

      const matchingSubCategories = subCategories
        .filter((subCat) => subCat.title.toLowerCase().includes(lowerCaseQuery))
        .map((subCat) => subCat._id);

      // Utility function for case-insensitive matching
      const includesQuery = (text) =>
        text.toLowerCase().includes(lowerCaseQuery);

      // Filter products based on the query and other filters
      const filtered = products.filter((product) => {
        const matchesQuery =
          includesQuery(product.name) ||
          (product.description && includesQuery(product.description)) ||
          matchingCategories.includes(product.category) ||
          matchingSubCategories.includes(product.subCategory);

        const matchesPrice =
          product.price >= filters.price[0] &&
          product.price <= filters.price[1];

        const matchesRating = filters.rating
          ? product.rating === filters.rating
          : true;

        const matchesCategory = filters.category
          ? product.category === filters.category
          : true;

        const matchesSubCategory = filters.subcategory
          ? product.subCategory === filters.subcategory
          : true;

        const matchesLatestArrival = filters.latestArrival
          ? product.latestArrival
          : true;

        return (
          matchesQuery &&
          matchesPrice &&
          matchesRating &&
          matchesCategory &&
          matchesSubCategory &&
          matchesLatestArrival
        );
      });

      setFilteredProducts(filtered);
    }, 300), // Adjust the debounce delay as needed
    [products, categories, subCategories, filters]
  );

  useEffect(() => {
    if (query.trim() === "") {
      // No query, show all products with applied filters
      const filtered = products.filter((product) => {
        const matchesPrice =
          product.price >= filters.price[0] &&
          product.price <= filters.price[1];

        const matchesRating = filters.rating
          ? product.rating === filters.rating
          : true;

        const matchesCategory = filters.category
          ? product.category === filters.category
          : true;

        const matchesSubCategory = filters.subcategory
          ? product.subCategory === filters.subcategory
          : true;

        const matchesLatestArrival = filters.latestArrival
          ? product.latestArrival
          : true;

        return (
          matchesPrice &&
          matchesRating &&
          matchesCategory &&
          matchesSubCategory &&
          matchesLatestArrival
        );
      });
      setFilteredProducts(filtered);
    } else {
      searchProducts(query);
    }
  }, [query, searchProducts, products, filters]);

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter.type]: filter.value,
    }));
  };

  return (
    <div className="container mt-4" style={{ paddingTop: "56px" }}>
      <div className="row">
        <div className="col-md-3">
          <Sidebar onFilterChange={handleFilterChange} />
        </div>
        <div className="col-md-9">
          <h2>
            {query ? `Search Results for "${query}"` : "Showing Products"}
          </h2>
          <div className="row mt-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id} className="col-sm-6 col-md-4 mb-4">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;
