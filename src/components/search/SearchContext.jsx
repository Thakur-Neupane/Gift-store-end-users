import React, { createContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const debouncedQueryUpdate = useCallback(
    debounce((query) => {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }, 300),
    [navigate]
  );

  const updateQuery = (newQuery) => {
    setQuery(newQuery);
    debouncedQueryUpdate(newQuery);
  };

  return (
    <SearchContext.Provider value={{ query, updateQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
