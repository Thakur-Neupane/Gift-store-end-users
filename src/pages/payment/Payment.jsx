// components/Payment.js
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckout from "./StripeCheckout";

const stripePublicKey = import.meta.env.VITE_APP_Stripe_Promise;

const stripePromise = loadStripe(stripePublicKey);

const Payment = () => {
  return (
    <div>
      <div className="container p-5 text-center">
        Complete Your Payment Here !!
        <hr />
        <Elements stripe={stripePromise}>
          <div className="col-md-8 offset-md-2">
            <StripeCheckout />
          </div>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
