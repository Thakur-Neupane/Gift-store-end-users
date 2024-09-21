import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
const useCart = (productId) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartInfo);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const productInCart = cart.find((item) => item._id === productId);
    setIsInCart(!!productInCart);
  }, [cart, productId]);

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item._id === productId);
    if (existingProduct) {
      dispatch(
        addToCart({ ...existingProduct, count: existingProduct.count + 1 })
      );
    } else {
      dispatch(addToCart({ _id: productId, count: 1 }));
    }
    setIsInCart(true);
    setTimeout(() => setIsInCart(false), 2000);
  };

  return { isInCart, handleAddToCart };
};

export default useCart;
