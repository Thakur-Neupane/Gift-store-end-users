import React, { useState } from "react";
import { Slider, Checkbox, Rate, Divider, Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const { Panel } = Collapse;

const Sidebar = ({ onFilterChange }) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [collapsed, setCollapsed] = useState({
    price: false,
    ratings: false,
    categories: false,
    latestArrival: false,
  });

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.catInfo.cats);

  const handlePriceChange = (value) => {
    onFilterChange({ type: "price", value });
  };

  const handleRatingChange = (rating) => {
    if (selectedRating === rating) {
      setSelectedRating(null);
      onFilterChange({ type: "rating", value: null });
    } else {
      setSelectedRating(rating);
      onFilterChange({ type: "rating", value: rating });
      // Optionally clear other filters if needed
      onFilterChange({ type: "category", value: null });
      onFilterChange({ type: "subcategory", value: null });
    }
  };

  const handleCategoryChange = (categoryId) => {
    onFilterChange({ type: "category", value: categoryId });
  };

  const handleLatestArrivalChange = (e) => {
    onFilterChange({ type: "latestArrival", value: e.target.checked });
  };

  const toggleCollapse = (section) => {
    setCollapsed((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="sidebar bg-light p-3">
      <div className="sidebar-section">
        <h4
          className="sidebar-header d-flex justify-content-between align-items-center"
          onClick={() => toggleCollapse("price")}
        >
          Search by Price
          {collapsed.price ? <FaChevronDown /> : <FaChevronUp />}
        </h4>
        <Collapse in={!collapsed.price}>
          <div>
            <Slider
              range
              defaultValue={[0, 1000]}
              onChange={handlePriceChange}
              tipFormatter={(value) => `$${value}`}
            />
          </div>
        </Collapse>
      </div>

      <Divider />

      <div className="sidebar-section">
        <h4
          className="sidebar-header d-flex justify-content-between align-items-center"
          onClick={() => toggleCollapse("ratings")}
        >
          Search by Ratings
          {collapsed.ratings ? <FaChevronDown /> : <FaChevronUp />}
        </h4>
        <Collapse in={!collapsed.ratings}>
          <div>
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="mb-2">
                <Rate disabled value={rating} />
                <Checkbox
                  checked={selectedRating === rating}
                  onChange={() => handleRatingChange(rating)}
                >
                  {rating} Star
                </Checkbox>
              </div>
            ))}
          </div>
        </Collapse>
      </div>

      <Divider />

      <div className="sidebar-section">
        <h4
          className="sidebar-header d-flex justify-content-between align-items-center"
          onClick={() => toggleCollapse("categories")}
        >
          Search by Categories
          {collapsed.categories ? <FaChevronDown /> : <FaChevronUp />}
        </h4>
        <Collapse in={!collapsed.categories}>
          <div>
            {categories.map((cat) => (
              <div key={cat._id} className="mb-2">
                <Checkbox onChange={() => handleCategoryChange(cat._id)}>
                  {cat.title}
                </Checkbox>
              </div>
            ))}
          </div>
        </Collapse>
      </div>

      <Divider />

      <div className="sidebar-section">
        <h4
          className="sidebar-header d-flex justify-content-between align-items-center"
          onClick={() => toggleCollapse("latestArrival")}
        >
          Search by Latest Arrival
          {collapsed.latestArrival ? <FaChevronDown /> : <FaChevronUp />}
        </h4>
        <Collapse in={!collapsed.latestArrival}>
          <div>
            <Checkbox onChange={handleLatestArrivalChange}>
              Show Latest Arrivals
            </Checkbox>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Sidebar;
