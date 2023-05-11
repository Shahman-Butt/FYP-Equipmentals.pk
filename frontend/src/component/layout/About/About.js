import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";

import logo from '../../../images/logo.PNG';



const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/";
  };
  return (

    <div className="aboutSection">
      <div className="banner1" style={{ "background-color": "#652D90", }}> <h2>ABOUT US </h2></div>
      <div></div>
      <div className="aboutSectionContainer">
        <div>
          <div>
         
           <h1>Wellcome To Our Project </h1>
            <Typography>FYP Team CE-19</Typography>
              <p>
              This project aims to provide a user-friendly web-based application for searching and filtering
through various products based on user preferences. Users can add their preferred products
to their favorites list and provide ratings and reviews. The application also includes an admin
dashboard displaying usage statistics and ensures product availability dates are displayed to
users. Developed using ReactJS and NodeJS for front-end and back-end development
respectively, the project employs Agile methodology with frequent sprints and user feedback,
resulting in an iterative design and development process. The platform was developed with a
focus on meeting the needs and preferences of the target audience, resulting in a seamless
and intuitive user experience. The project has the potential to offer a convenient and cost-effective alternative to traditional renting methods while promoting the sharing economy
and reducing environmental impact.</p>
          </div>
          <div className="aboutSectionContainer2 bg-transparent">
        <h1>OUR TEAM </h1>
            
            <h3>Marriam Salman 2019-CE-15</h3>
            <h3>Ahmad Hassan 2019-CE-16</h3>
            <h3>Shahman Butt 2019-CE-30</h3>

          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
