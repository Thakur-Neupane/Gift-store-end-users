import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import img from "../../assets/images/page_not_found.svg";
import "./error.css";

const ErrorPage = () => {
  return (
    <Container className="error-page d-flex align-items-center justify-content-center min-vh-100 text-center">
      <Row>
        <Col>
          <Image src={img} alt="not-found" className="img-fluid mb-4 animate" />
          <h3>Oh No! Page Not Found</h3>
          <p>
            It seems we've hit a dead end. The page you're looking for is
            missing.
          </p>
          <Button
            variant="primary"
            as={Link}
            to="/"
            className="back-home-button"
          >
            Go Back Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
