import { useEffect } from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import {
  fetchSingleUserProfileAction,
  updateUserProfilePicAction,
} from "../../../features/users/userAction";

import useForm from "../../../Hooks/useForm";
import ProfilePicUploader from "../../../components/common/custom-modal/ProfilePicUploader";

const userEp = import.meta.env.VITE_APP_SERVER_ROOT;
const ProfilePage = () => {
  const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const { form, setForm, setImages } = useForm({ user });

  useEffect(() => {
    // Fetch user data from API
    if (user?._id === form?._id) {
      dispatch(fetchSingleUserProfileAction(user._id));
    }
  }, [dispatch, user, form]);

  const handleProfilePicUpload = (file) => {
    const formData = new FormData();
    formData.append("profilePic", file);

    dispatch(updateUserProfilePicAction(user._id, formData));
  };

  return (
    <div>
      <main className="vh-100 pt-10">
        <Row className="my-4">
          <Col md={4} className="text-center">
            {/* Display user's profile picture if it exists, otherwise show a placeholder */}
            <Image
              src={
                `${userEp}/${user?.profilePic}` ||
                "path/to/default-placeholder.jpg"
              }
              roundedCircle
              fluid
              style={{ maxHeight: "300px", maxWidth: "300px" }}
            />
            <h2 className="mt-3">{`${user.fName} ${user.lName}`}</h2>

            <ProfilePicUploader
              onUpload={handleProfilePicUpload}
              buttonText={
                user.profilePic
                  ? "Change Profile Picture"
                  : "Add Profile Picture"
              }
            />
          </Col>
          <Col md={8}>
            <Row>
              <Col xs={12} className="mb-2">
                <strong>Status: </strong>
                {user.status}
              </Col>
              <Col xs={12} className="mb-2">
                <strong>Role: </strong>
                {user.role}
              </Col>
              <Col xs={12} className="mb-2">
                <strong>Phone: </strong>
                {user.phone}
              </Col>
              <Col xs={12} className="mb-2">
                <strong>Gender: </strong>
                {user.gender}
              </Col>
              <Col xs={12} className="mb-2">
                <strong>Email: </strong>
                {user.email}
              </Col>
              <Col xs={12} className="mb-2">
                <strong>Email Verified: </strong>
                {user.isEmailVerified ? "Yes" : "No"}
              </Col>
              <Col xs={12} className="mb-2">
                <strong>Account Created: </strong>
                {new Date(user.createdAt).toLocaleString()}
              </Col>
              <Col xs={12} className="mb-2">
                <strong>Last Updated: </strong>
                {new Date(user.updatedAt).toLocaleString()}
              </Col>
              {user.address && (
                <Col xs={12} className="mb-2">
                  <strong>Address: </strong>
                  {user.address}
                </Col>
              )}
              {user.bio && (
                <Col xs={12} className="mb-2">
                  <strong>Bio: </strong>
                  {user.bio}
                </Col>
              )}
            </Row>
            <Row className="mt-4">
              <Col xs={12} className="text-center">
                <Button
                  variant="primary"
                  as={Link}
                  to={`/edit-profile/${user._id}`}
                  className="me-2"
                >
                  Edit Profile
                </Button>
                <Button
                  variant="secondary"
                  as={Link}
                  to={`/change-password/${user._id}`}
                >
                  Change Password
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default ProfilePage;
