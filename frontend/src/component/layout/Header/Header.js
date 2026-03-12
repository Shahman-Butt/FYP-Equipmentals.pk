import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import logo2 from "../../../images/logo2.png";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NotificationPanel from "./NotificationPanel";

function NavScrollExample({ user }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const [activeLink, setActiveLink] = useState("/");
  
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  async function logoutUser() {
    await dispatch(logout());
    history.push("/login");
    alert.success("Logout Successfully");
  }

  function userProduct() {
    history.push("/admin/products");
  }

  function product() {
    history.push("/admin/product");
  }

  const alert = useAlert();
  const dispatch = useDispatch();

  return (
    <>
      <Navbar className="main-header" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/" exact>
            <img src={logo2} alt="EquipmentalsPk Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "auto" }} navbarScroll>
              <Nav.Link
                as={NavLink}
                exact
                to="/"
                activeClassName="active-link"
                onClick={() => handleLinkClick("/")}
              >
                Home
              </Nav.Link>

              {isAuthenticated && (
                <>
                  <NavDropdown title="Dashboard" id="dashboard-nav-dropdown">
                    <NavDropdown.Item onClick={userProduct}>Dashboard</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/products">View Products</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={product}>Post Product</NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Profile" id="profile-nav-dropdown">
                    <NavDropdown.Item as={NavLink} to="/account" onClick={() => handleLinkClick("/account")}>
                      View Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={NavLink} to="/me/update" onClick={() => handleLinkClick("/me/update")}>
                      Update Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutUser}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}

              <Nav.Link
                as={NavLink}
                to="/about"
                activeClassName="active-link"
                onClick={() => handleLinkClick("/about")}
              >
                About
              </Nav.Link>
            </Nav>

            <Form className="d-flex header-search-form" onSubmit={searchSubmitHandler}>
              <Form.Control
                type="search"
                placeholder="Search premium equipment..."
                className="header-search-input"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button type="submit" className="header-search-btn">
                Search
              </Button>
            </Form>

            <Nav>
              {isAuthenticated ? (
                <div style={{ marginLeft: "1rem" }}>
                  <NotificationPanel user={user} />
                </div>
              ) : (
                <Nav.Link
                  className="login-btn-header"
                  as={NavLink}
                  to="/login"
                  activeClassName="active-link"
                  onClick={() => handleLinkClick("/login")}
                >
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavScrollExample;
