import { useEffect, useRef, useState } from "react";
import { Alert, Spinner, Image, Button } from "react-bootstrap";
import { useSearchParams, Link } from "react-router-dom";
import { verifyUserLinkAction } from "../../features/users/userAction";
import successImg from "../../assets/images/two_factor_authentication.svg";
import img from "../../assets/images/page_not_found.svg";

const UserVerification = () => {
  const [searchParams] = useSearchParams();
  const c = searchParams.get("c");
  const e = searchParams.get("e");

  const [resp, setResp] = useState({});
  const shouldCall = useRef(true);

  useEffect(() => {
    if (shouldCall.current) {
      (async () => {
        const data = await verifyUserLinkAction({ c, e });
        setResp(data);
      })();
      shouldCall.current = false;
    }
  }, [c, e]);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${resp.status === "success" ? successImg : img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff", // Ensure text is visible on the background image
      }}
    >
      <div className="p-3 rounded text-center " style={{ width: "450px" }}>
        {resp.message ? (
          <>
            <Alert variant={resp.status === "success" ? "success" : "danger"}>
              {resp.message}
            </Alert>
            {resp.status === "success" ? (
              <Button variant="primary" as={Link} to="/signIn">
                Proceed to Sign In
              </Button>
            ) : (
              <Button variant="primary" as={Link} to="/">
                Home page
              </Button>
            )}
          </>
        ) : (
          <>
            <Spinner variant="primary" className="fs-1" />
            <div>Please wait while we are verifying your link....</div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserVerification;
