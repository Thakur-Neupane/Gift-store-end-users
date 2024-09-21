import { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";

const PasswordRegex = ({ password }) => {
  const [strength, setStrength] = useState(0);

  const refExpWeak = /[a-z]/;
  const refExpMedium = /\d+/;
  const refExpStrong = /[!,@,#,$,%,^,&,*,\(,\),_,-,?,~]/;

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 7) strength++;
    if (password.match(refExpWeak)) strength++;
    if (password.match(refExpMedium)) strength++;
    if (password.match(refExpStrong)) strength++;
    return strength;
  };

  useEffect(() => {
    const newStrength = checkPasswordStrength(password);
    setStrength(newStrength);
  }, [password]);

  const getProgressVariant = () => {
    switch (strength) {
      case 1:
        return "danger";
      case 2:
        return "warning";
      case 3:
        return "info";
      case 4:
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    password && (
      <ProgressBar
        now={(strength / 4) * 100}
        variant={getProgressVariant()}
        label={
          strength === 1
            ? "Weak"
            : strength === 2
            ? "Medium"
            : strength === 3
            ? "Strong"
            : strength === 4
            ? "Very Strong"
            : ""
        }
      />
    )
  );
};

export default PasswordRegex;
