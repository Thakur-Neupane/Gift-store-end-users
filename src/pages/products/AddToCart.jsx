import React, { useState, useEffect } from "react";
import { Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { setVisible } from "../../features/cart/drawerSlice"; // Import the drawer action

const AddToCart = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const [isInCart, setIsInCart] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartInfo);

  const { _id } = product;

  useEffect(() => {
    // Check if the product is already in the cart
    const productInCart = cart.find((item) => item._id === _id);
    setIsInCart(!!productInCart);

    // Update tooltip based on cart state
    setTooltip(productInCart ? "Added" : "Click to add");
  }, [cart, _id]);

  const handleAddToCart = () => {
    // Dispatch action to add to cart
    dispatch(addToCart({ ...product, count: 1 }));

    // Dispatch action to open the drawer
    dispatch(setVisible(true));

    // Update tooltip and button state
    setTooltip("Added");
    setIsInCart(true);
    setTimeout(() => {
      setTooltip("Click to add");
      setIsInCart(false);
    }, 2000);
  };

  return (
    <Tooltip title={tooltip}>
      <a
        onClick={handleAddToCart}
        className={`flex items-center justify-center px-4 py-2 rounded-lg transition-all duration-300 ${
          isInCart
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
        }`}
        disabled={isInCart}
      >
        <ShoppingCartOutlined className="text-xl" />
        <span className="ml-2 text-base font-medium">
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </span>
      </a>
    </Tooltip>
  );
};

export default AddToCart;
