import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import {
  fetchCartByUserIdAction,
  saveOrderAction,
  deleteCartsAction,
  updateCartAddressAction,
} from "../../features/checkout/checkoutAction";
import { applyCouponAction } from "../../features/coupons/couponAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook for navigation
  const { _id } = useParams(); // Extract userId from route parameters
  const { cart, loading, error } = useSelector((state) => state.checkoutInfo);
  const { appliedCoupon, totalAfterDiscount, applyCouponError } = useSelector(
    (state) => state.couponInfo
  );

  const [formData, setFormData] = useState({
    unitNumber: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: "",
    message: "",
  });
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (_id) {
      dispatch(fetchCartByUserIdAction(_id));
    }
  }, [_id, dispatch]);

  useEffect(() => {
    if (cart?.address) {
      setFormData(cart.address);
      setShowForm(false);
    } else {
      setFormData({
        unitNumber: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phoneNumber: "",
        message: "",
      });
      setShowForm(true);
    }
  }, [cart]);

  useEffect(() => {
    if (totalAfterDiscount !== null) {
      setDiscount(cart.cartTotal - totalAfterDiscount);
    }
  }, [totalAfterDiscount, cart]);

  useEffect(() => {
    if (applyCouponError) {
      toast.error("Error applying coupon: " + applyCouponError);
    }
  }, [applyCouponError]);

  useEffect(() => {
    if (appliedCoupon) {
      toast.success(`${appliedCoupon} coupon applied successfully!`);
    }
  }, [appliedCoupon]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveAddress = async () => {
    try {
      await dispatch(updateCartAddressAction(_id, formData));
      dispatch(fetchCartByUserIdAction(_id));
      setShowForm(false);
    } catch (err) {
      console.error("Failed to update address:", err);
    }
  };

  const handleEditAddress = () => {
    setFormData(cart.address);
    setShowForm(true);
  };

  const handleSaveOrder = async () => {
    if (!cart || !cart.address) return;

    const orderData = {
      items: cart.products.map((item) => ({
        product: item._id,
        count: item.count,
        color: item.color,
        price: item.price,
        size: item.size,
      })),
      total: cart.cartTotal,
      address: cart.address,
      userId: _id,
    };

    try {
      await dispatch(saveOrderAction(orderData));
      navigate("/payment");
    } catch (err) {
      console.error("Failed to save order:", err);
      toast.error("Failed to place order, please try again.");
    }
  };

  const handleEmptyCart = () => {
    dispatch(deleteCartsAction());
  };

  const applyDiscountCoupon = async () => {
    try {
      if (!cart || cart.cartTotal === undefined) {
        toast.error("Cart total is not available");
        return;
      }

      if (appliedCoupon) {
        toast.error("A coupon code has already been applied.");
        return;
      }

      await dispatch(
        applyCouponAction({
          couponCode: coupon,
          cartTotal: cart.cartTotal,
          userId: _id,
        })
      );
    } catch (error) {
      toast.error(
        "Error applying coupon: " + (error.message || "Unknown error")
      );
    }
  };

  const CouponSection = () => (
    <div className="mb-4">
      <Form.Group controlId="couponCode">
        <Form.Label>Coupon Code</Form.Label>
        <div className="d-flex">
          <Form.Control
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
          />
          <Button
            onClick={applyDiscountCoupon}
            className="ml-2"
            variant="primary"
          >
            Apply
          </Button>
        </div>
      </Form.Group>
    </div>
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              {showForm ? (
                <>
                  <Card.Title>Delivery Address</Card.Title>
                  <Form>
                    <Form.Group controlId="unitNumber">
                      <Form.Label>Unit Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="unitNumber"
                        value={formData.unitNumber}
                        onChange={handleInputChange}
                        placeholder="Enter unit number"
                      />
                    </Form.Group>
                    <Form.Group controlId="street">
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder="Enter street"
                      />
                    </Form.Group>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                      />
                    </Form.Group>
                    <Form.Group controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Enter state"
                      />
                    </Form.Group>
                    <Form.Group controlId="zipCode">
                      <Form.Label>Zip Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        placeholder="Enter zip code"
                      />
                    </Form.Group>
                    <Form.Group controlId="country">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Enter country"
                      />
                    </Form.Group>
                    <Form.Group controlId="phoneNumber">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                      />
                    </Form.Group>
                    <Form.Group controlId="message">
                      <Form.Label>Order Message (Optional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Enter any message for the order"
                      />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSaveAddress}>
                      Save Address
                    </Button>
                  </Form>
                </>
              ) : (
                <div>
                  <Card.Title>Delivery Address</Card.Title>
                  <Card.Text className="text-muted">
                    <p>
                      <strong>Delivering to:</strong>{" "}
                      {cart?.address?.unitNumber}, {cart?.address?.street},{" "}
                      {cart?.address?.city}, {cart?.address?.state},{" "}
                      {cart?.address?.zipCode}, {cart?.address?.country}
                    </p>
                    <p>
                      <strong>Phone Number:</strong>{" "}
                      {cart?.address?.phoneNumber}
                    </p>
                    <p>
                      <strong>Order Message:</strong> {cart?.address?.message}
                    </p>
                  </Card.Text>
                  <Button
                    variant="outline-secondary"
                    onClick={handleEditAddress}
                  >
                    Edit Address
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <hr />
              <p>Products: {cart?.products.length || 0}</p>
              <ul>
                {cart?.products.map((item) => (
                  <li key={item._id}>
                    {item.name} ({item.color}) x {item.count} = $
                    {item.price * item.count}
                  </li>
                ))}
              </ul>
              <hr />
              <p>
                <strong>Cart Total:</strong> ${cart?.cartTotal || 0}
              </p>
              {discount > 0 && (
                <p>
                  <strong>Discount Applied:</strong> ${discount}
                </p>
              )}
              <p>
                <strong>Total After Discount:</strong> $
                {(cart?.cartTotal - discount).toFixed(2)}
              </p>
              <CouponSection />
              <Button
                variant="success"
                onClick={handleSaveOrder}
                disabled={!cart?.products.length}
              >
                Place Order
              </Button>
              <Button
                variant="danger"
                onClick={handleEmptyCart}
                className="ml-2"
              >
                Empty Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
