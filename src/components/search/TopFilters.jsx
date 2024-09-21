import React, { useState, useEffect } from "react";
import { Slider, Checkbox, Rate, Dropdown, Menu, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const TopFilters = ({ onFilterChange }) => {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [latestArrival, setLatestArrival] = useState(false);
  const [bestSellers, setBestSellers] = useState(false);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const catInfo = useSelector((state) => state.catInfo.cats);

  useEffect(() => {
    setCategories(catInfo);
  }, [catInfo]);

  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange({ type: "price", value });
  };

  const handleRatingChange = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
    onFilterChange({ type: "ratings", value: selectedRatings });
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    onFilterChange({ type: "category", value: categoryId });
  };

  const handleLatestArrivalChange = (e) => {
    setLatestArrival(e.target.checked);
    onFilterChange({ type: "latestArrival", value: e.target.checked });
  };

  const handleBestSellersChange = (e) => {
    setBestSellers(e.target.checked);
    onFilterChange({ type: "bestSellers", value: e.target.checked });
  };

  const categoryMenu = (
    <Menu>
      {categories.map((cat) => (
        <Menu.Item key={cat._id}>
          <a onClick={() => handleCategoryChange(cat._id)}>{cat.title}</a>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className="top-filters bg-light p-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        <div className="filter-section">
          <span>Price Range:</span>
          <Slider
            range
            value={priceRange}
            onChange={handlePriceChange}
            tipFormatter={(value) => `$${value}`}
            style={{ width: 250 }}
          />
        </div>

        <div className="filter-section">
          <span>Ratings:</span>
          <div className="d-flex align-items-center">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="me-2">
                <Rate
                  disabled
                  value={rating}
                  style={{
                    fontSize: 16,
                    color: selectedRatings.includes(rating)
                      ? "#ffc107"
                      : "#e4e5e9",
                  }}
                />
                <Checkbox
                  checked={selectedRatings.includes(rating)}
                  onChange={() => handleRatingChange(rating)}
                >
                  {rating} Star
                </Checkbox>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <Dropdown overlay={categoryMenu} trigger={["click"]}>
            <Button>
              {selectedCategory
                ? categories.find((cat) => cat._id === selectedCategory)?.title
                : "Category"}{" "}
              <FaChevronDown />
            </Button>
          </Dropdown>
        </div>

        <div className="filter-section">
          <Checkbox
            checked={latestArrival}
            onChange={handleLatestArrivalChange}
          >
            Latest Arrivals
          </Checkbox>
        </div>

        <div className="filter-section">
          <Checkbox checked={bestSellers} onChange={handleBestSellersChange}>
            Best Sellers
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

export default TopFilters;
