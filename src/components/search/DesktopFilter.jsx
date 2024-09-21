import React from "react";
import { Collapse, Checkbox, Divider, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const { Panel } = Collapse;

const DesktopFilter = ({ handleOnCategoryFilter, handleSubCatFilter }) => {
  const dispatch = useDispatch();
  const { categories, brands, materials } = useSelector(
    (state) => state.categories
  );
  const { filteredProducts, activeFilters } = useSelector(
    (state) => state.products
  );

  const handlePriceChange = (value) => {
    dispatch({ type: "FILTER_BY_PRICE", payload: value });
  };

  const handleRatingChange = (rating) => {
    dispatch({ type: "FILTER_BY_RATING", payload: rating });
  };

  const handleCategoryChange = (categoryId) => {
    handleOnCategoryFilter(categoryId);
  };

  const handleSubCategoryChange = (value) => {
    handleSubCatFilter(value);
  };

  return (
    <div className="sidebar bg-light p-3">
      {/* Price Range */}
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Price Range" key="1" extra={null} showArrow>
          <Slider
            range
            defaultValue={[0, 1000]}
            onChange={handlePriceChange}
            tipFormatter={(value) => `$${value}`}
          />
        </Panel>

        {/* Ratings */}
        <Panel header="Ratings" key="2" extra={null} showArrow>
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="mb-2">
              <Rate disabled value={rating} />
              <Checkbox
                checked={activeFilters["rating"] === rating}
                onChange={() => handleRatingChange(rating)}
              >
                {rating} Star
              </Checkbox>
            </div>
          ))}
        </Panel>

        {/* Categories */}
        <Panel header="Categories" key="3" extra={null} showArrow>
          {categories?.map((item) => (
            <div key={item._id} className="mb-2">
              <Checkbox
                checked={activeFilters["category"]?.includes(item._id)}
                onChange={() => handleCategoryChange(item._id)}
              >
                {item.title}
              </Checkbox>
            </div>
          ))}
        </Panel>

        {/* Latest Arrivals */}
        <Panel header="Latest Arrivals" key="4" extra={null} showArrow>
          <Checkbox
            checked={activeFilters["latestArrival"]}
            onChange={(e) =>
              dispatch({
                type: "FILTER_BY_LATEST_ARRIVAL",
                payload: e.target.checked,
              })
            }
          >
            Show Latest Arrivals
          </Checkbox>
        </Panel>
      </Collapse>
    </div>
  );
};

export default DesktopFilter;
