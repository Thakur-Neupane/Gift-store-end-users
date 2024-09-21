import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from "react-bootstrap";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./contact.css";

const Contact = () => {
  return (
    <div>
      <Container className="my-5">
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Contact Information</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <FaPhone className="me-2" /> Phone: +1 234 567 890
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FaEnvelope className="me-2" /> Email: support@hi-tech.com
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <FaMapMarkerAlt className="me-2" /> Address: 123 Tech
                    Street, Sydney, NSW, Australia
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Working Hours</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>Monday - Friday: 9 AM - 6 PM</ListGroup.Item>
                  <ListGroup.Item>Saturday: Closed</ListGroup.Item>
                  <ListGroup.Item>Sunday: Closed</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Contact Form</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" placeholder="Enter subject" />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Enter your message"
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
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>Our Location</Card.Title>
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345098977!2d144.95373531568073!3d-37.8172099797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5774184b7b9770!2sVictoria%20Market%20Car%20Park!5e0!3m2!1sen!2sau!4v1634093987645!5m2!1sen!2sau"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
