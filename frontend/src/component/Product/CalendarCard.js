import { Rating } from "@material-ui/lab";
import React from "react";
// import profilePng from "../../images/Profile.png";

const CalendarCard = ({ cal }) => {
  const date = new Date(cal.date);

  const formattedDate = date.toLocaleDateString("en-US", {
    // year: "numeric",
    month: "long",
    day: "numeric",
  });

  // console.log(formattedDate); // Output: 5/3/2023

  return (
    <>
      {/* <div className="calendarCard"> */}
      {formattedDate} <br></br>
      {/* <p>"{cal.isBooked}" is the booking status</p> */}
      {/* <Rating {...options} /> */}
      {/* <span className="reviewCardComment">{review.comment}</span> */}
      {/* </div> */}
    </>
  );
};

export default CalendarCard;
