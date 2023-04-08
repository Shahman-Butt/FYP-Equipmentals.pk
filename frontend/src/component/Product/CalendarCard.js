import { Rating } from "@material-ui/lab";
import React from "react";
// import profilePng from "../../images/Profile.png";

const CalendarCard = ({ cal }) => {
  const options = {
    value: cal.isBooked,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="calendarCard">
      <p>{cal.date} is the date </p>

      {/* <p>"{cal.isBooked}" is the booking status</p> */}
      <Rating {...options} />
      {/* <span className="reviewCardComment">{review.comment}</span> */}
    </div>
  );
};

export default CalendarCard;
