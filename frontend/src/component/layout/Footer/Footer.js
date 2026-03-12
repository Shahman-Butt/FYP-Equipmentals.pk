import React from "react";
import "./Footer.css";
import { useLocation, Link } from "react-router-dom";
import logo2 from "../../../images/logo2.png";

const Footer = () => {
  const location = useLocation();

  const hiddenRoutes = [
    "/about",
    "/account",
    "/admin/reviews",
    "/admin/product",
    "/admin/users",
    "/admin/products",
    "/admin/dashboard",
    "/contact",
    "/me/update",
  ];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="modern-footer">
      <div className="footer-container px-xl-5">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-logo">
               <img src={logo2} alt="EquipmentalsPk" />
            </Link>
            <p className="footer-description">
              High-quality premium equipment rentals for your next big project. Reliable, verified, and ready to use.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Rental Catalog</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/returns">Return Policy</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="footer-col contact-col">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact-info">
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>University of Engineering, Lahore Campus</span>
              </li>
              <li>
                <i className="fas fa-phone"></i>
                <span>(042) 99029452</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:EquipmentalsPk@gmail.com">EquipmentalsPk@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container-fluid px-xl-5">
          <p>&copy; {new Date().getFullYear()} EquipmentalsPk. All rights reserved.</p>
          <p className="developed-by">Developed as FYP - Session 2019 BS Computer Engineering, UET Lahore</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
