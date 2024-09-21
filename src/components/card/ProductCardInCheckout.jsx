import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../assets/images/a.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  updateCartProductColor,
  updateCartProductCount,
  removeProduct,
} from "../../features/cart/cartSlice";

const ProductCardInCheckout = ({ p }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartInfo);

  const products = useSelector((state) => state.productInfo.products); // Adjust according to your state structure

  // Find the product details from the products array
  const product = products.find((prod) => prod._id === p._id) || {};
  const colorOptions = Array.isArray(product.color) ? product.color : [];

  // Find the current color for this product in the cart
  const currentProduct = cart.find((item) => item._id === p._id);
  const currentColor = currentProduct ? currentProduct.color : "";

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    if (newColor !== currentColor) {
      dispatch(updateCartProductColor({ _id: p._id, color: newColor }));
    }
  };

  const handleQuantityChange = (e) => {
    const count = parseInt(e.target.value, 10);
    if (isNaN(count) || count < 1) return;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    dispatch(updateCartProductCount({ _id: p._id, count }));
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct({ _id: p._id }));
  };

  return (
    <tr>
      <td>
        <div style={{ width: "100px", height: "auto" }}>
          {p.images.length ? (
            <ModalImage small={p.images[0].url} large={p.images[0].url} />
          ) : (
            <ModalImage small={laptop} large={laptop} />
          )}
        </div>
      </td>
      <td>{p.name}</td>
      <td>${p.price.toFixed(2)}</td>
      <td>
        <select
          onChange={handleColorChange}
          name="color"
          className="form-control"
          value={currentColor || ""} // Ensure value is always a string
        >
          <option value="" disabled>
            Select
          </option>
          {colorOptions.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="number"
          className="form-control"
          value={p.count}
          onChange={handleQuantityChange}
          min="1"
        />
      </td>
      <td>
        <button onClick={handleRemoveProduct} className="btn btn-danger btn-sm">
          Remove
        </button>
      </td>
    </tr>
  );
};

export default ProductCardInCheckout;
