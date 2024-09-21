import { useState } from "react";
import axios from "axios";
import { Form, ListGroup } from "react-bootstrap";

const AddressInput = ({ label, name, value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const response = await axios.get(
      "https://us1.locationiq.com/v1/search.php",
      {
        params: {
          key: import.meta.env.VITE_APP_LOCATIONIQ,
          q: query,
          format: "json",
          addressdetails: 1,
          limit: 5,
        },
      }
    );

    setSuggestions(response.data);
  };

  const handleInputChange = (e) => {
    onChange(e);
    fetchSuggestions(e.target.value);
  };

  const handleSuggestionClick = (address) => {
    onChange({ target: { name, value: address.display_name } });
    setSuggestions([]);
  };

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder="Enter your address"
      />
      {suggestions.length > 0 && (
        <ListGroup>
          {suggestions.map((suggestion, index) => (
            <ListGroup.Item
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.display_name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Form.Group>
  );
};

export default AddressInput;
