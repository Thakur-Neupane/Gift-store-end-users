import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  FaTools,
  FaShippingFast,
  FaSyncAlt,
  FaHeadset,
  FaShieldAlt,
  FaCreditCard,
} from "react-icons/fa";
import "./service.css";
import { useState } from "react";

const Service = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    preferredDate: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form Data Submitted:", formData);
  };
  return (
    <div>
      <Container className="my-5">
        <h2 className="text-center mb-4">Our Services</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <FaTools size={50} className="mb-3 services-icon" />
                <Card.Title>Product Installation</Card.Title>
                <Card.Text>
                  We offer professional installation services for all our tech
                  products. Our experts ensure a seamless setup for your
                  convenience.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <FaShippingFast size={50} className="mb-3 services-icon" />
                <Card.Title>Fast Shipping</Card.Title>
                <Card.Text>
                  Enjoy fast and reliable shipping for all orders. We ensure
                  your products are delivered to your doorstep promptly and
                  safely.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <FaSyncAlt size={50} className="mb-3 services-icon" />
                <Card.Title>Easy Returns</Card.Title>
                <Card.Text>
                  Our hassle-free return policy allows you to return products
                  within 30 days. We strive to make returns as easy as possible
                  for our customers.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <FaHeadset size={50} className="mb-3 services-icon" />
                <Card.Title>24/7 Customer Support</Card.Title>
                <Card.Text>
                  Our dedicated customer support team is available 24/7 to
                  assist you with any queries or issues you may have.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <FaShieldAlt size={50} className="mb-3 services-icon" />
                <Card.Title>Warranty Services</Card.Title>
                <Card.Text>
                  We provide warranty services for all our products, ensuring
                  peace of mind and protection for your purchases.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body className="text-center">
                <FaCreditCard size={50} className="mb-3 services-icon" />
                <Card.Title>Secure Payments</Card.Title>
                <Card.Text>
                  Our platform offers secure payment options to ensure your
                  transactions are safe and protected.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <h2 className="text-center mt-5 mb-4">Book an Appointment</h2>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your phone number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formServiceType">
                    <Form.Label>Type of Service</Form.Label>
                    <Form.Control
                      as="select"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Service Type</option>
                      <option value="Product Installation">
                        Product Installation
                      </option>
                      <option value="Fast Shipping">Fast Shipping</option>
                      <option value="Easy Returns">Easy Returns</option>
                      <option value="24/7 Customer Support">
                        24/7 Customer Support
                      </option>
                      <option value="Warranty Services">
                        Warranty Services
                      </option>
                      <option value="Secure Payments">Secure Payments</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPreferredDate">
                    <Form.Label>Preferred Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Additional details (optional)"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Service;
