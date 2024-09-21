import { Container, Row, Col, Button } from "react-bootstrap";
import main from "../../../assets/images/main.svg";
import { Link } from "react-router-dom";

const ProfileLanding = () => {
  return (
    <>
      <Container className="page">
        <Row className="align-items-center">
          <Col md={6} className="info">
            <h1>
              Hi-Tech <span>Solutions</span>
            </h1>
            <p className="fw-bolder">
              Embrace the future with our cutting-edge technology solutions.
              Create your profile, explore innovative opportunities, and join
              the tech revolution today!
            </p>
            <Link to="/signIn">
              <Button className="btn-hero">Login/Register</Button>
            </Link>
          </Col>
          <Col md={6}>
            <img
              src={main}
              alt="Hi-Tech Solutions"
              className="img-fluid main-img"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileLanding;
