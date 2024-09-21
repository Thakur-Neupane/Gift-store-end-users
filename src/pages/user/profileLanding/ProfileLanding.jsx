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
              RS <span>Store</span>
            </h1>
            <p className="fw-bolder">RS Store all for your gifts</p>
            <Link to="/signIn">
              <Button className="btn-hero">Login/Register</Button>
            </Link>
          </Col>
          <Col md={6}>
            <img src={main} alt="RS Gifting" className="img-fluid main-img" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileLanding;
