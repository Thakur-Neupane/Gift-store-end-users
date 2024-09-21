import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import { createPaymentIntentAction } from "../../features/stripe/stripeAction";
import { createOrderAction } from "../../features/orders/orderAction";
import { deleteCartsAction } from "../../features/checkout/checkoutAction";
import { clearCart } from "../../features/cart/cartSlice";
import "./Stripe.css";

const StripeCheckout = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userInfo);
  const { cart } = useSelector((state) => state.checkoutInfo);
  const { appliedCoupon, totalAfterDiscount } = useSelector(
    (state) => state.couponInfo
  );
  const { clientSecret, cartTotal, payable } = useSelector(
    (state) => state.stripeInfo
  );

  useEffect(() => {
    if (user && cart) {
      dispatch(createPaymentIntentAction(user._id, cart, appliedCoupon));
    }
  }, [user, cart, appliedCoupon, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!clientSecret) {
      setError("No client secret available.");
      setProcessing(false);
      return;
    }

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      // After successful payment, create an order and clear the cart
      dispatch(createOrderAction(payload.paymentIntent.id, user._id));
      dispatch(clearCart()); // Clear cart from Redux
      localStorage.removeItem("cart"); // Assuming you store cart in localStorage
      dispatch(clearOrderAction()); // Clear order from Redux state

      // Redirect to a success page
      navigate("/user/history");
    }
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src="/path-to-image/laptop.jpg" // Update with actual image path
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <div>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {cartTotal}
            </div>,
            <div>
              <CheckOutlined className="text-info" /> <br /> Total payable: $
              {payable / 100}
            </div>,
          ]}
        />
      </div>

      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.{" "}
          <Link to="/user/history">See it in your purchase history.</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
