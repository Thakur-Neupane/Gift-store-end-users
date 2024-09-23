import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaChevronRight,
} from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="waves">
          <div className="wave" id="wave1"></div>
          <div className="wave" id="wave2"></div>
          <div className="wave" id="wave3"></div>
          <div className="wave" id="wave4"></div>
        </div>

        <div className="main">
          <div className="footer">
            <div className="single-footer">
              <h3>Thank you for scrolling</h3>
              <p>
                Your journey with us is just beginning. Explore our offerings
                and celebrate life’s special moments!
              </p>
              <div className="footer-social">
                <a href="#">
                  <FaFacebook />
                </a>
                <a href="#">
                  <FaInstagram />
                </a>
                <a href="#">
                  <FaYoutube />
                </a>
                <a href="#">
                  <FaTwitter />
                </a>
              </div>
            </div>

            <div className="single-footer">
              <h4>Main Menu</h4>
              <ul>
                <li>
                  <Link to="/">
                    <FaChevronRight /> Home
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    <FaChevronRight /> About Us
                  </Link>
                </li>
                <li>
                  <Link to="/service">
                    <FaChevronRight /> Services
                  </Link>
                </li>
                <li>
                  <Link to="/contact">
                    <FaChevronRight /> Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq">
                    <FaChevronRight /> FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="single-footer">
              <h4>Contact Us</h4>
              <ul>
                <li>
                  <FaChevronRight /> Bidur - 4 Battar Nuwakot
                </li>
                <li>
                  <FaChevronRight /> Phone: 23456789
                </li>
                <li>
                  <FaChevronRight /> Email: your-email@example.com
                </li>
              </ul>
            </div>
          </div>
          <div className="copy">
            <p>&copy; 2024 all rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
