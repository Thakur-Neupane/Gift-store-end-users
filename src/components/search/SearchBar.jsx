import React, { useContext } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { SearchContext } from "./SearchContext";

const SearchBar = () => {
  const { query, updateQuery } = useContext(SearchContext);

  const handleChange = (e) => {
    updateQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
    }
  };

  return (
    <div className="search-bar-container">
      <Form
        className="d-flex mx-auto"
        onSubmit={handleSearch}
        style={{ width: "100%" }}
      >
        <FormControl
          type="search"
          placeholder="Search for products"
          className="me-2"
          aria-label="Search"
          value={query}
          onChange={handleChange}
        />
        <Button variant="outline-dark" type="submit">
          <FaSearch />
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
