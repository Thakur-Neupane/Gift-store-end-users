// File: SignIn.js
import React, { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/common/custom-input/CustomInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { loginUserAction } from "../../features/users/userAction";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const { user } = useSelector((state) => state.userInfo);

  const redirectTo = location?.state?.from || "/";

  useEffect(() => {
    if (user?._id) {
      navigate(redirectTo);
    }
  }, [user?._id, navigate, redirectTo]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    if (!email || !password) {
      return toast.error("Must have email and password filled");
    }

    dispatch(loginUserAction({ email, password }));
  };

  if (user?._id) {
    // User is already logged in, redirect to the target page
    return null;
  }

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      placeholder: "email@email.com",
      forwardRef: emailRef,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "*******",
      forwardRef: passwordRef,
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="" style={{ width: "450px" }}>
          <Form
            className="shadow-lg p-3 rounded bg-light"
            onSubmit={handleOnSubmit}
          >
            <h3 className="text-center">Admin Login</h3>
            <hr />
            {inputs.map((item, i) => (
              <CustomInput key={i} {...item} />
            ))}
            <div className="d-grid mt-3">
              <div className="text-start pb-1">
                Forget password? <a href="/forget-password">Reset Now</a>
              </div>
              <Button type="submit">Login Now</Button>
            </div>
            <div className="text-end pb-1">
              Don't have an account? <a href="/signUp">Create Now</a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
