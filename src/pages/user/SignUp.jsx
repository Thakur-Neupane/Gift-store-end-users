import { Button, Form, ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  CustomInput,
  CustomSelect,
} from "../../components/common/custom-input/CustomInput";
import useForm from "../../Hooks/useForm";

import PasswordRegex from "../../helpers/PasswordRegex";
import { useEffect, useState } from "react";
import { createNewUserAction } from "../../features/users/userAction";

const SignUp = () => {
  const { form, setForm, handleOnChange } = useForm({});
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { gender, confirmPassword, ...rest } = form;
    if (!["male", "female", "preferNotToSay"].includes(gender)) {
      return toast.error("Invalid gender value");
    }
    if (confirmPassword !== rest.password) {
      return toast.error("Password do not match");
    }
    createNewUserAction(rest);
  };
  useEffect(() => {
    if (form.password && form.confirmPassword) {
      setPasswordMatch(form.password === form.confirmPassword);
    } else {
      setPasswordMatch(false);
    }
  }, [form.password, form.confirmPassword]);

  const inputs = [
    {
      label: "First Name",
      name: "fName",
      type: "text",
      required: true,
      placeholder: "Enter your First Name",
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      required: true,
      placeholder: "Enter your last Name",
    },
    {
      label: "phone",
      name: "phone",
      type: "number",
      placeholder: "0412345",
    },
    {
      label: "Gender",
      name: "gender",
      type: "text",
      isSelectType: true,
      required: true,
      options: [
        { label: "-- Select --", value: "" },
        {
          value: "male",
          label: "Male",
        },
        {
          value: "female",
          label: "Female",
        },
        {
          value: "preferNotToSay",
          label: "Prefer Not To Say",
        },
      ],
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "email@email.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "*******",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      required: true,
      placeholder: "*******",
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div style={{ width: "450px" }}>
          <Form className="shadow-lg p-3 rounded" onSubmit={handleOnSubmit}>
            <h3>User Registration</h3>
            {inputs.map((item, i) => (
              <div key={i}>
                {item.isSelectType ? (
                  <CustomSelect {...item} onChange={handleOnChange} />
                ) : (
                  <CustomInput {...item} onChange={handleOnChange} />
                )}
                {item.name === "password" && (
                  <PasswordRegex password={form.password || ""} />
                )}
              </div>
            ))}
            {form.password && form.confirmPassword && (
              <ProgressBar
                now={100}
                variant={passwordMatch ? "success" : "danger"}
                label={
                  passwordMatch ? "Passwords match" : "Passwords do not match"
                }
              />
            )}
            <div className="d-grid mt-2">
              <Button type="submit" disabled={!passwordMatch}>
                Register New User
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
