import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../../components/card/ProductCardInCheckout";
import { saveOrderAction } from "../../features/checkout/checkoutAction";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartInfo);
  const user = useSelector((state) => state.userInfo.user);

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.count * item.price, 0);
  };

  const saveOrderToDb = async () => {
    if (!user) {
      navigate("/signIn", { state: { from: location.pathname } });
      return;
    }

    const orderData = {
      items: cart,
      total: getTotal(),
      userId: user._id,
      title: cart.map((item) => item.name).join(", "),
    };

    try {
      await dispatch(saveOrderAction(orderData));
      navigate(`/checkout/${user._id}`);
    } catch (err) {
      console.error("Error saving order:", err);
    }
  };

  const handleProceedToCheckout = () => {
    saveOrderToDb();
  };

  const renderCartItems = () => {
    return cart.length > 0 ? (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <ProductCardInCheckout key={item._id} p={item} />
          ))}
        </tbody>
      </table>
    ) : (
      <p>
        No products in cart. <Link to="/shop">Continue Shopping.</Link>
      </p>
    );
  };

  const renderOrderSummary = () => (
    <>
      <h4>Order Summary</h4>
      <hr />
      <p>Products</p>
      {cart.map((item, index) => (
        <div key={index}>
          <p>
            {item.name} x {item.count} = ${item.price * item.count}
          </p>
        </div>
      ))}
      <hr />
      Total: <b>${getTotal()}</b>
      <hr />
      <button
        onClick={handleProceedToCheckout}
        className="btn btn-sm btn-primary mt-2"
        disabled={!cart.length}
      >
        {user ? "Proceed to Checkout" : "Login to Checkout"}
      </button>
    </>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>
            Cart / {cart.length} Product{cart.length !== 1 ? "s" : ""}
          </h4>
          {renderCartItems()}
        </div>
        <div className="col-md-4">{renderOrderSummary()}</div>
      </div>
    </div>
  );
};

export default Cart;
