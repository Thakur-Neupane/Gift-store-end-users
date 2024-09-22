import { Container, Row, Col, Button } from "react-bootstrap";
import main from "../../../assets/images/main.svg";
import { Link } from "react-router-dom";

const ProfileLanding = () => {
  return (
    <Container className="py-16 bg-gray-100">
      <Row className="flex items-center">
        <Col md={6} className="text-left">
          <h1 className="text-4xl font-bold">
            RS <span className="text-blue-500">Store</span>
          </h1>
          <p className="font-bold text-lg">
            All your gifting needs in one place
          </p>
          <Link to="/signIn">
            <Button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200">
              Login/Register
            </Button>
          </Link>
        </Col>
        <Col md={6}>
          <img src={main} alt="RS Gifting" className="w-full h-auto" />
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileLanding;
