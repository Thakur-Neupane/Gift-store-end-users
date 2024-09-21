import React from "react";
import { Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AddToCart from "../../pages/products/AddToCart";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { images, name, _id, price, salesPrice } = product;

  // Calculate discount percentage if applicable
  const calculateDiscountPercentage = (price, salesPrice) => {
    if (price && salesPrice && price > salesPrice) {
      return Math.round(((price - salesPrice) / price) * 100);
    }
    return 0;
  };

  return (
    <Card
      hoverable
      cover={
        <Link to={`/product/${_id}`} className="block">
          <div className="relative w-full h-0 pb-[75%]">
            <img
              src={images?.[0]?.url || "/path/to/default/image.jpg"}
              alt={name}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-105"
            />
          </div>
        </Link>
      }
      actions={[
        <Link
          to={`/product/${_id}`}
          key="view"
          className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
        >
          <EyeOutlined className="text-xl" />
          <span className="ml-1">View Product</span>
        </Link>,
        <AddToCart key="cart" product={product} />,
      ]}
      className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 max-w-[300px] w-full h-[450px] flex flex-col"
    >
      <div className="flex-1 flex flex-col p-4">
        <Meta
          title={
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold">{name}</h3>
              <div className="mt-2 text-base">
                {salesPrice ? (
                  <div>
                    <span className="line-through text-red-600 mr-2">
                      ${price}
                    </span>
                    <span className="text-green-600 font-bold">
                      ${salesPrice} (
                      {calculateDiscountPercentage(price, salesPrice)}% off)
                    </span>
                  </div>
                ) : (
                  <span>${price}</span>
                )}
              </div>
            </div>
          }
          className="flex-1"
        />
      </div>
    </Card>
  );
};

export default ProductCard;
