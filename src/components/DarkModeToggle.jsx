import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkModeToggle = () => {
  // Initialize state based on localStorage
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // Update the document when isDarkMode changes
  useEffect(() => {
    // Toggle the 'dark' class on the <html> element
    document.documentElement.classList.toggle("dark", isDarkMode);
    // Save the current theme to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <Button
      onClick={() => setIsDarkMode(!isDarkMode)} // Toggle dark mode
      variant="outline-secondary"
      className="d-flex align-items-center"
    >
      {/* Icon and text based on the current theme */}
      {isDarkMode ? <FaSun /> : <FaMoon />}
      <span className="ms-2">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
    </Button>
  );
};

export default DarkModeToggle;
