import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";
import { useLocation } from "react-router-dom";



const Footer = () => {

  const location = useLocation();

  // if (location.pathname === "/about") {
  //   return null;
  // }
  // if (location.pathname === "/account") {
  //   return null;
  // }
  // if (location.pathname === "/contact") {
  //   return null;
  // }
  // if (location.pathname === "/me/update") {
  //   return null;
  // }
  if (location.pathname === "/about" || location.pathname === "/account" || location.pathname === "/admin/reviews"|| location.pathname === "/admin/product"|| location.pathname === "/admin/users" || location.pathname === "/admin/products" ||location.pathname === "/admin/dashboard" || location.pathname === "/contact" || location.pathname === "/me/update") {
    return null;
  }
  
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>EquipmentalsPk</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; EquipmentalsPk</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/">Instagram</a>
        <a href="http://youtube.com/">Youtube</a>
        <a href="http://instagram.com/">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
