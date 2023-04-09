
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState } from "react";
import logo from '../../../images/logo.PNG';

import video from "../../../../src/video.mp4"
import { useHistory } from "react-router-dom";

function NavScrollExample() {

  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };


  return (

    <>
      <div className="video-container">
        <video autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>



      <div bg="white">

        <div className="row py-2 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark" href style={{ "font-weight": "bold", "color": "#333;" }}>FAQs</a>
              <span className="text-muted px-2">|</span>
              <a className="text-dark" href style={{ "font-weight": "bold", "color": "#333;" }}>Help</a>
              <span className="text-muted px-2">|</span>
              <a className="text-dark" href style={{ "font-weight": "bold", "color": "#333;" }}>Support</a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center" style={{ "marginLeft": "80%" }}>
              <a className="text-dark px-2" href>
                <i className="fab fa-facebook-f" />
              </a>
              <a className="text-dark px-2" href>
                <i className="fab fa-twitter" />
              </a>
              <a className="text-dark px-2" href>
                <i className="fab fa-linkedin-in" />
              </a>
              <a className="text-dark px-2" href>
                <i className="fab fa-instagram" />
              </a>
              <a className="text-dark pl-2" href>
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
        </div>

      </div>

      <Navbar bg="transparent" expand="lg">

        <Container fluid>


          <div style={{ "margin-right": "10%" }}>
            <a href="/">
              <img style={{ "max-width": "55%" }} src={logo} />
            </a>
          </div>
          <div style={{ "width": "40%" }}>
            <Form className="d-flex" onSubmit={searchSubmitHandler} bg="transparent">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button className="outline-success" style={{ "background-color": "#652D90", "border": "none" }} type="submit">
                Search
              </Button>

            </Form>
          </div>


          <div >
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/" style={{ "font-weight": "bold", "color": "#333;" }}>Home</Nav.Link>
                <Nav.Link href="/about" style={{ "font-weight": "bold", "color": "#333;" }}>About</Nav.Link>
                <Nav.Link href="/contact" style={{ "font-weight": "bold", "color": "#333;" }}>Contact</Nav.Link>


                <Nav.Link href="/products" style={{ "font-weight": "bold", "color": "#333;" }}>Products</Nav.Link>

              

              </Nav>
              <Button href='/account' className="outline-success" style={{ "background-color": "#652D90", "border": "none" }} >
                  Profile
                </Button>

            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>

  );
}

export default NavScrollExample;