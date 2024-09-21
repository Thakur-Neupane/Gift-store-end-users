import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
  Collapse,
  Offcanvas,
} from "react-bootstrap";
import { FaUser, FaMoon, FaSun, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUserAction } from "../../../features/users/userAction";
import { getCategoryAction } from "../../../features/categories/catAction";
import { getSubCategoryAction } from "../../../features/subcategories/subCatAction";
import logo from "../../../assets/images/a.png";
import SearchBar from "../../search/SearchBar";
import { Badge } from "antd";
export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const { cats } = useSelector((state) => state.catInfo);
  const { subCats } = useSelector((state) => state.subCatInfo);
  const cart = useSelector((state) => state.cartInfo);

  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    dispatch(getCategoryAction());
    dispatch(getSubCategoryAction());
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleToggleExpand = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const groupedSubCats = subCats.reduce((acc, subCat) => {
    (acc[subCat.parent] = acc[subCat.parent] || []).push(subCat);
    return acc;
  }, {});

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.count, 0);
  return (
    <>
      {/* Header for larger screens */}
      <div className="d-none d-md-block">
        <Navbar bg="white" className="border-bottom">
          <Container fluid>
            <Navbar.Brand className="me-auto">
              <Link to="/" className="d-flex align-items-center">
                <img src={logo} alt="Logo" style={{ height: "40px" }} />
                <span className="ms-2">Gift Store</span>
              </Link>
            </Navbar.Brand>
            <div className="d-flex align-items-center">
              <div className="search-bar-container">
                <SearchBar className="w-100" />
              </div>
              <div className="d-flex align-items-center ms-3">
                <Button
                  variant="link"
                  className="p-0"
                  onClick={handleDarkModeToggle}
                >
                  {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                </Button>
                <Nav className="ms-3">
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    className="d-flex align-items-center mb-3 position-relative"
                  >
                    <FaShoppingCart size={20} />
                    <Badge
                      count={cart ? cart.length : 0}
                      className="badge-custom"
                    />
                  </Nav.Link>
                  <NavDropdown
                    title={<FaUser />}
                    id="basic-nav-dropdown"
                    align="center"
                    className="custom-dropdown"
                  >
                    {user._id ? (
                      <>
                        <NavDropdown.Item as={Link} to="/Userprofile">
                          Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to={`/change-password/${user._id}`}
                        >
                          Change Password
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          as={Link}
                          to="/"
                          onClick={() => dispatch(logOutUserAction())}
                        >
                          Logout
                        </NavDropdown.Item>
                      </>
                    ) : (
                      <>
                        <NavDropdown.Item as={Link} to="/profile">
                          Profile Landing
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/signIn">
                          Login
                        </NavDropdown.Item>
                      </>
                    )}
                  </NavDropdown>
                </Nav>
              </div>
            </div>
          </Container>
        </Navbar>

        <Navbar bg="dark" variant="dark">
          <Container fluid>
            <Nav className="mx-auto">
              {cats
                .filter((cat) => cat.status === "active")
                .map(({ _id, title }) => (
                  <div key={_id} className="position-relative">
                    <Button
                      variant="outline-info"
                      onClick={() => handleToggleExpand(_id)}
                      aria-expanded={expandedCategory === _id}
                      className="text-white me-2"
                    >
                      {title}
                    </Button>

                    <Collapse in={expandedCategory === _id}>
                      <div className="bg-light p-2 rounded">
                        {groupedSubCats[_id] &&
                          groupedSubCats[_id].map(({ _id, title }) => (
                            <Link
                              key={_id}
                              to={`/subcategory/${_id}`}
                              className="d-block text-dark ms-3"
                            >
                              {title}
                            </Link>
                          ))}
                      </div>
                    </Collapse>
                  </div>
                ))}
            </Nav>
          </Container>
        </Navbar>
      </div>

      {/* Header for smaller screens */}
      <Navbar bg="white" expand="md" className="d-md-none border-bottom">
        <Container
          fluid
          className="d-flex align-items-center justify-content-between"
        >
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <img src={logo} alt="Logo" style={{ height: "40px" }} />
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <SearchBar className="d-none d-sm-block" />
            <Button
              variant="link"
              className="p-0 ms-2"
              onClick={handleDarkModeToggle}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </Button>
            <Navbar.Toggle
              aria-controls="offcanvasNavbar"
              onClick={() => setShowOffcanvas(true)}
            />
          </div>
        </Container>
        <Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/cart"
                className="d-flex align-items-center mb-3 position-relative"
              >
                <FaShoppingCart size={20} />
                <Badge
                  count={cart ? cart.length : 0}
                  className="badge-custom"
                />
                Cart
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/wishlist"
                className="d-flex align-items-center mb-3"
              >
                <FaHeart className="me-2" />
                My Wishlist
              </Nav.Link>
              {cats
                .filter((cat) => cat.status === "active")
                .map(({ _id, title }) => (
                  <div key={_id} className="position-relative">
                    <Button
                      variant="link"
                      onClick={() => handleToggleExpand(_id)}
                      aria-expanded={expandedCategory === _id}
                      className="text-dark w-100 mb-2"
                    >
                      {title}
                    </Button>

                    <Collapse in={expandedCategory === _id}>
                      <div className="bg-light p-2 rounded">
                        {groupedSubCats[_id] &&
                          groupedSubCats[_id].map(({ _id, title }) => (
                            <Link
                              key={_id}
                              to={`/subcategory/${_id}`}
                              className="d-block text-dark ms-3"
                            >
                              {title}
                            </Link>
                          ))}
                      </div>
                    </Collapse>
                  </div>
                ))}
              <NavDropdown
                title={<FaUser />}
                id="basic-nav-dropdown"
                align="end"
                className="custom-dropdown"
              >
                {user._id ? (
                  <>
                    <NavDropdown.Item as={Link} to="/Userprofile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={`/change-password/${user._id}`}
                    >
                      Change Password
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to="/"
                      onClick={() => dispatch(logOutUserAction())}
                    >
                      Logout
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile Landing
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/signIn">
                      Login
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </Navbar>
    </>
  );
};
