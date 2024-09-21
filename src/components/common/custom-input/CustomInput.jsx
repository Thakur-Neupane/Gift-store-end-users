import { Form } from "react-bootstrap";

export const CustomInput = ({ label, forwardRef, ...rest }) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      {rest.type === "textarea" ? (
        <Form.Control as="textarea" {...rest} ref={forwardRef} />
      ) : (
        <Form.Control {...rest} ref={forwardRef} />
      )}
    </Form.Group>
  );
};

export const CustomSelect = ({
  label,
  options,
  forwardRef,
  isSelectType,
  ...rest
}) => {
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Select {...rest} ref={forwardRef}>
        {options?.map(({ value, label }, i) => (
          <option key={i} value={value}>
            {label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};
