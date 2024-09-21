import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import img from "../../assets/images/page_not_found.svg";
import "./error.css";

const ErrorPage = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 text-center">
      <Row>
        <Col>
          <Image src={img} alt="not-found" className="img-fluid mb-4" />
          <h3>Ohh! Page Not Found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Button variant="primary" as={Link} to="/">
            Back Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
