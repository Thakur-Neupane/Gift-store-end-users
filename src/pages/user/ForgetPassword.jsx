import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { RequestOTP } from "../../components/password-reset/RequestOTP";
import { ResetPass } from "../../components/password-reset/ResetPass";
import { requestOTP, resetPassword } from "../../features/users/userAxios";

const ForgetPassword = () => {
  const [showForm, setShowForm] = useState("otp");
  const [email, setEmail] = useState("");
  const [resp, setResp] = useState({});
  const [timer, setTimer] = useState(90);
  const handleOnOTPRequest = async (email) => {
    setTimer(90);
    setEmail(email);
    const response = await requestOTP({
      email,
    });
    setResp(response);
    if (response.status === "success") {
      setShowForm("reset");
      countDown();
    }
  };

  const countDown = () => {
    const cd = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(cd);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleOnResetPassword = (obj) => {
    resetPassword(...obj, email);
  };

  const forms = {
    otp: <RequestOTP handleOnOTPRequest={handleOnOTPRequest} />,
    reset: <ResetPass handleOnResetPassword={handleOnResetPassword} />,
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100  bg-dark">
      <div className="bg-white p-3" style={{ width: "450px" }}>
        {resp.message && (
          <>
            <Alert variant={resp.status === "success" ? "success" : "danger"}>
              {resp.message}
            </Alert>
            <div className="m-3">
              OTP not received? request otp again
              <Button
                variant="secondary"
                disabled={timer > 0}
                onClick={() => handleOnOTPRequest(email)}
              >
                Request OTP again in {timer}s
              </Button>
            </div>
          </>
        )}

        {forms[showForm]}
        <div className="text-end mt-3">
          <a href="/signIn">Login Now</a>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;
