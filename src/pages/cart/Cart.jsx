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
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = async () => {
    if (user) {
      const orderData = {
        items: cart,
        total: getTotal(),
        userId: user._id,
        title: cart.name,
      };

      try {
        await dispatch(saveOrderAction(orderData));

        // Navigate to checkout with the actual user ID
        navigate(`/checkout/${user._id}`);
      } catch (err) {
        console.error("Error saving order:", err);
      }
    } else {
      navigate("/signIn", { state: { from: location.pathname } });
    }
  };

  const handleProceedToCheckout = () => {
    if (user) {
      saveOrderToDb();
    } else {
      navigate("/signIn", { state: { from: location.pathname } });
    }
  };

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>
            Cart / {cart.length} Product{cart.length > 1 ? "s" : ""}
          </h4>
          {!cart.length ? (
            <p>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
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
                {cart.map((p) => (
                  <ProductCardInCheckout key={p._id} p={p} />
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.name} x {c.count} = ${c.price * c.count}
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
        </div>
      </div>
    </div>
  );
};

export default Cart;
