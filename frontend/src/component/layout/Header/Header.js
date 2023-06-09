import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";
import logo from "../../../images/logo.PNG";
import { NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { logout } from "../../../actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import NotificationPanel from "./NotificationPanel.js";
// import logo2 from "../../../images/logo2.png";

import logo2 from "../../../images/logo2.png";
import { useHistory } from "react-router-dom";

function NavScrollExample({ user }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [keyword, setKeyword] = useState("");
  const history = useHistory();
  const [activeLink, setActiveLink] = useState("/");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  // console.log("h", user);
  // const role = user.rol;
  // console.log(role, "role");
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
    // console.log("user func 1");
  }
  function product() {
    history.push("/admin/product");
    // console.log("admin func 1");
  }
  const alert = useAlert();
  const dispatch = useDispatch();

  return (
    <>
      <Navbar bg="transparent" expand="lg">
        <Container fluid>
          <div className="head1">
            <a href="/">
              <img
                style={{ "max-width": "100%", height: "auto" }}
                src={logo2}
              />
            </a>
          </div>

          <div className="head3">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarScroll"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "auto" }}
                navbarScroll
              >
                <Nav.Link
                  className="d-flex align-items-top"
                  as={NavLink}
                  exact
                  to="/"
                  style={{ "font-weight": "bold" }}
                  activeClassName="active-link"
                  onClick={() => handleLinkClick("/")}
                >
                  <div className="maxau">Home</div>
                </Nav.Link>
                {isAuthenticated ? (
                  <>
                    <NavDropdown
                      className="d-flex align-items-top maxau"
                      title="Dashboard"
                      style={{ "font-weight": "bold", color: "#333;" }}
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item
                        href=""
                        activeClassName="active-link"
                        onClick={userProduct}
                      >
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        href="/products"
                        activeClassName="active-link"
                      >
                        View Products
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={product}
                        activeClassName="active-link"
                      >
                        Post Product
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                    </NavDropdown>
                    <NavDropdown
                      className="d-flex align-items-top maxau"
                      title="Profile"
                      style={{ "font-weight": "bold", color: "#333;" }}
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item
                        href="/account"
                        activeClassName="active-link"
                        onClick={() => handleLinkClick("/account")}
                      >
                        View Profile
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        href="/me/update"
                        activeClassName="active-link"
                        onClick={() => handleLinkClick("/me/update")}
                      >
                        Update Profile
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={logoutUser}
                        activeClassName="active-link"
                      >
                        Logout
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                    </NavDropdown>
                  </>
                ) : (
                  <></>
                )}
                {/* <Nav.Link as={NavLink} to="/products" style={{ "font-weight": "bold", "color": "#333;" }} activeClassName="active-link" onClick={() => handleLinkClick('/products')}>
                  Products
                </Nav.Link> */}

                <Nav.Link
                  className="d-flex align-items-top"
                  as={NavLink}
                  to="/about"
                  style={{
                    "font-weight": "bold",
                    color: "#333;",
                    "text-align": "left",
                  }}
                  activeClassName="active-link"
                  onClick={() => handleLinkClick("/about")}
                >
                  <div className="maxau">About</div>
                </Nav.Link>

                {isAuthenticated ? (
                  <>
                    <NotificationPanel user={user} />
                  </>
                ) : (
                  <>
                    <Nav.Link
                      className="d-flex align-items-center maxau"
                      onClick={() => handleLinkClick("/login")}
                      as={NavLink}
                      to="/login"
                      style={{ "font-weight": "bold", color: "#333;" }}
                      activeClassName="active-link"
                    >
                      Login
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>

      <>
        <div className="head2">
          <center>
            {" "}
            <Form
              className="d-flex"
              onSubmit={searchSubmitHandler}
              bg="transparent"
            >
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                align-item="center"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                className="outline-success"
                style={{ "background-color": "#652D90", border: "none" }}
                type="submit"
              >
                Search
              </Button>
            </Form>
          </center>
        </div>
      </>
    </>
  );
}

export default NavScrollExample;
