import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserByIdAction } from "../../features/users/userSlice"; // Correct import path
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const UserDetails = () => {
  const { id } = useParams(); // Get user ID from route parameters
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo.user);
  const status = useSelector((state) => state.userInfo.status);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserByIdAction(id)); // Fetch user details by ID
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Card.Title>User Details</Card.Title>
              <Card.Text>
                <strong>First Name:</strong> {user.fName || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Last Name:</strong> {user.lName || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {user.email || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {user.status || "N/A"}
              </Card.Text>
              <Card.Text>
                <strong>Role:</strong> {user.role || "N/A"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
