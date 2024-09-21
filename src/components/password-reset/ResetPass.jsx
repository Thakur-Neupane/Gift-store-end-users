import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../common/custom-input/CustomInput";
import { useRef } from "react";
import { toast } from "react-toastify";

export const ResetPass = ({ handleOnResetPassword }) => {
  const otpRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const obj = {
      otp: otpRef.current.value,
      password: passwordRef.current.value,
    };
    if (obj.password !== confirmPasswordRef.current.value) {
      return toast.error("Password do not match, try again");
    }
    handleOnResetPassword(obj);
  };

  const inputs = [
    {
      label: "OTP",
      name: "otp",
      type: "number",
      required: true,
      placeholder: "123456",
      forwardRef: otpRef,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      required: true,
      placeholder: "***********",
      forwardRef: passwordRef,
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      required: true,
      placeholder: "**********",
      forwardRef: confirmPasswordRef,
    },
  ];

  return (
    <Form className="shadow-lg p-3 rounded  bg-light" onSubmit={handleOnSubmit}>
      <h3 className="text-center">Reset Password</h3>
      <hr />
      {inputs.map((item, i) => (
        <CustomInput key={i} {...item} />
      ))}

      <div className="d-grid mt-3">
        <Button type="submit">Reset Now</Button>
      </div>
      <div className="text-end">
        Forget password ? {""}
        <a href="/forget-password">Reset Now</a>
      </div>
    </Form>
  );
};
