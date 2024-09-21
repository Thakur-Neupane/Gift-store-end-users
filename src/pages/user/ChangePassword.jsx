import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  ProgressBar,
} from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import useForm from "../../Hooks/useForm";
import {
  fetchSingleUserProfileAction,
  updateUserPasswordAction,
} from "../../features/users/userAction";
import PasswordRegex from "../../helpers/PasswordRegex";

const ChangePassword = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const { form, handleOnChange, setForm } = useForm({ user });
  const [passwordMatch, setPasswordMatch] = useState(false);

  useEffect(() => {
    if (_id !== form?._id) {
      dispatch(fetchSingleUserProfileAction(_id));
      user?._id && setForm(user);
    }
  }, [dispatch, _id, form, user, setForm]);

  useEffect(() => {
    if (form.newPassword && form.confirmNewPassword) {
      setPasswordMatch(form.newPassword === form.confirmNewPassword);
    } else {
      setPasswordMatch(false);
    }
  }, [form.newPassword, form.confirmNewPassword]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { email, oldPassword, newPassword, confirmNewPassword } = form;

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    if (window.confirm("Are you sure you want to change your password?")) {
      try {
        const status = await dispatch(
          updateUserPasswordAction({
            email,
            oldPassword,
            newPassword,
            confirmNewPassword,
          })
        );

        if (status === "success") {
          navigate("/Userprofile"); // Redirect to the UserProfile page
        } else {
          alert("Password change failed. Please try again.");
        }
      } catch (error) {
        console.error("Error changing password:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
      disabled: true,
    },
    {
      label: "Old Password",
      name: "oldPassword",
      type: "password",
      placeholder: "Enter your old password",
      required: true,
    },
    {
      label: "New Password",
      name: "newPassword",
      type: "password",
      placeholder: "Enter your new password",
      required: true,
    },
    {
      label: "Confirm New Password",
      name: "confirmNewPassword",
      type: "password",
      placeholder: "Confirm your new password",
      required: true,
    },
  ];

  return (
    <div>
      <Container className="vh-100">
        <h4 className="py-4">Change Password</h4>
        <Link to="/Userprofile">
          <Button variant="secondary">&lt; Back</Button>
        </Link>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleOnSubmit}>
              {inputs.map((input, i) => (
                <div key={i}>
                  <CustomInput
                    {...input}
                    onChange={handleOnChange}
                    value={form[input.name] || ""}
                  />
                  {input.name === "newPassword" && (
                    <PasswordRegex password={form.newPassword || ""} />
                  )}
                </div>
              ))}
              {form.newPassword && form.confirmNewPassword && (
                <ProgressBar
                  now={100}
                  variant={passwordMatch ? "success" : "danger"}
                  label={
                    passwordMatch ? "Passwords match" : "Passwords do not match"
                  }
                />
              )}
              <div className="d-grid mt-3 mb-3">
                <Button type="submit" disabled={!passwordMatch}>
                  Change Password
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ChangePassword;
