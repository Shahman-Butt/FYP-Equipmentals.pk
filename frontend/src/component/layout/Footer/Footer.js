import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer2.css";
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
  if (location.pathname === "/about" ||  location.pathname === "/account" || location.pathname === "/admin/reviews"|| location.pathname === "/admin/product"|| location.pathname === "/admin/users" || location.pathname === "/admin/products" ||location.pathname === "/admin/dashboard" || location.pathname === "/contact" || location.pathname === "/me/update") {
    return null;
  }
  
  return (
  //   <>   
  //   <div bg="white" style={{"margin-top": "10vmax"}}>

  //   <div className="row py-2 px-xl-5">
  //     <div className="col-lg-6 d-none d-lg-block">
  //       <div className="d-inline-flex align-items-center">
  //         <a className="text-dark" href style={{ "font-weight": "bold", "color": "#333;" }}>FAQs</a>
  //         <span className="text-muted px-2">|</span>
  //         <a className="text-dark" href style={{ "font-weight": "bold", "color": "#333;" }}>Help</a>
  //         <span className="text-muted px-2">|</span>
  //         <a className="text-dark" href style={{ "font-weight": "bold", "color": "#333;" }}>Support</a>
  //       </div>
  //     </div>
  //     <div className="col-lg-6 text-center text-lg-right">
  //       <div className="d-inline-flex align-items-center" style={{ "marginLeft": "80%" }}>
  //         <a className="text-dark px-2" href>
  //           <i className="fab fa-facebook-f" />
  //         </a>
  //         <a className="text-dark px-2" href>
  //           <i className="fab fa-twitter" />
  //         </a>
  //         <a className="text-dark px-2" href>
  //           <i className="fab fa-linkedin-in" />
  //         </a>
  //         <a className="text-dark px-2" href>
  //           <i className="fab fa-instagram" />
  //         </a>
  //         <a className="text-dark pl-2" href>
  //           <i className="fab fa-youtube" />
  //         </a>
  //       </div>
  //     </div>
  //   </div>

  // </div>
  // <footer id="footer">
  //     <div className="leftFooter">
  //       <h4>DOWNLOAD OUR APP</h4>
  //       <p>Download App for Android and IOS mobile phone</p>
  //       <img src={playStore} alt="playstore" />
  //       <img src={appStore} alt="Appstore" />
  //     </div>

  //     <div className="midFooter">
  //       <h1>EquipmentalsPk</h1>
  //       <p>High Quality is our first priority</p>

  //       <p>Copyrights 2021 &copy; EquipmentalsPk</p>
  //     </div>

  //     <div className="rightFooter">
  //       <h4>Follow Us</h4>
  //       <a href="http://instagram.com/">Instagram</a>
  //       <a href="http://youtube.com/">Youtube</a>
  //       <a href="http://instagram.com/">Facebook</a>
  //     </div>
  //   </footer>
  //   </>
  <>
  <>
  
  </>



<footer class="footer-distributed">

			<div class="footer-left" >

				<h3>Equipmentals<span>Pk</span></h3>

				<p class="footer-links">
					<a href="/" class="link-1">Home</a>
					
					<a href="/about">About</a>
					
					<a href="/products">Products</a>
					
					<a href="/contact">Contact</a>
				</p>

				<p class="footer-company-name">EquipmentalsPk © 2023</p>
			</div>

			<div class="footer-center">
      <h5>Contact Details</h5>
				
          <li><i class="fas fa-map-marker-alt"></i> University of Engineering </li>
					<li><i class="fas fa-phone"></i> (042) 99029452 </li>
          <li><i class="fas fa-envelope"></i> <a href="mailto:support@company.com">EquipmentalsPk@gmail.com</a> </li>
			

			</div>

			<div class="footer-right">
      <h5>About the company</h5>
				<p class="footer-company-about">
					This is our FYP for session 2019 BS Computer Engineering, UET Lahore Campus 
				</p>

			
			</div>

		</footer>
  </>
  
  );
};

export default Footer;
