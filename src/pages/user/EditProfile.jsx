import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate, useParams } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import { useEffect } from "react";
import {
  editUserProfileAction,
  fetchSingleUserProfileAction,
} from "../../features/users/userAction";
import { Button, Container, Form } from "react-bootstrap";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import AddressInput from "../../components/autoAddress/AddressInput";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useParams();
  const { user } = useSelector((state) => state.userInfo);
  const { form, handleOnChange, setForm } = useForm({ user });

  useEffect(() => {
    if (_id !== form?._id) {
      dispatch(fetchSingleUserProfileAction(_id));
      user?._id && setForm(user);
    }
  }, [dispatch, _id, user, setForm, form]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const {
      __v,
      createdAt,
      updatedAt,
      role,
      email,
      gender,
      status,
      isEmailVerified,
      refreshJWT,
      ...rest
    } = form;

    if (window.confirm("Are you sure you want to make these changes?")) {
      try {
        const status = await dispatch(editUserProfileAction(rest));

        if (status === "success") {
          navigate("/Userprofile");
        } else {
          alert("Profile Update failed. Please try again.");
        }
      } catch (error) {
        console.error("Error Updating profile:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      required: true,
      placeholder: "Write your first name",
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      required: true,
      placeholder: "Write your last name",
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      required: false,
      placeholder: "041345678",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "email@email.com",
      disabled: true,
    },
    {
      label: "Gender",
      name: "gender",
      type: "text",
      required: true,
      placeholder: "Gender",
      disabled: true,
    },
    {
      label: "Bio",
      name: "bio",
      type: "textarea",
      required: false,
      placeholder: "Write a short bio",
      rows: "4",
    },
  ];

  return (
    <div>
      <Container className="vh-100">
        <h4 className="py-4">Profile Update</h4>
        <Link to="/Userprofile">
          <Button variant="secondary">&lt; Back</Button>
        </Link>
        <Form onSubmit={handleOnSubmit}>
          {inputs?.map((input, i) => (
            <CustomInput
              key={i}
              {...input}
              onChange={handleOnChange}
              value={form[input.name] || ""}
            />
          ))}
          <AddressInput
            label="Address"
            name="address"
            value={form.address || ""}
            onChange={handleOnChange}
          />
          <CustomInput
            label="Password"
            name="password"
            type="password"
            required={true}
            placeholder="Enter your current password"
            onChange={handleOnChange}
            value={form.password || ""}
          />
          <div className="d-grid mt-3 mb-3">
            <Button type="submit">Update your Profile</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default EditProfile;
