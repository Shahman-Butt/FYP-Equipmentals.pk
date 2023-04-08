// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";

// const Calendar = ({ productId }) => {
//   const [unavailableDates, setUnavailableDates] = useState([]);

//   useEffect(() => {
//     // Fetch product's unavailable dates on mount
//     axios
//       .get(`/products/${productId}/availability`)
//       .then((response) => setUnavailableDates(response.data))
//       .catch((error) => console.error(error));
//   }, [productId]);

//   const handleDateClick = async (event) => {
//     const selectedDate = event.dateStr;

//     // Check if the selected date is already marked as unavailable
//     if (unavailableDates.includes(selectedDate)) {
//       // Remove the date from the unavailable dates list
//       const updatedUnavailableDates = unavailableDates.filter(
//         (date) => date !== selectedDate
//       );
//       try {
//         await axios.put(`/products/${productId}/availability`, {
//           unavailableDates: updatedUnavailableDates,
//         });
//         setUnavailableDates(updatedUnavailableDates);
//       } catch (error) {
//         console.error(error);
//       }
//     } else {
//       // Add the date to the unavailable dates list
//       const updatedUnavailableDates = [...unavailableDates, selectedDate];
//       try {
//         await axios.put(`/products/${productId}/availability`, {
//           unavailableDates: updatedUnavailableDates,
//         });
//         setUnavailableDates(updatedUnavailableDates);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <div className="calendar-container">
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         selectable={true}
//         dateClick={handleDateClick}
//         events={unavailableDates.map((date) => ({
//           title: "Unavailable",
//           start: date,
//         }))}
//       />
//     </div>
//   );
// };

// export default Calendar;

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const ProductCalendar = ({ productId }) => {
  const [calendar, setCalendar] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { product } = useSelector((state) => state.productDetails);
  useEffect(() => {
    const fetchCalendar = async () => {
      const { data } = await axios.get(`/api/product/${productId}/calendar`);
      setCalendar(data);
    };
    fetchCalendar();
  }, [productId]);

  const handleDateClick = (date) => {
    const updatedCalendar = [...calendar];
    const index = updatedCalendar.findIndex(
      (d) => d.date === date.toISOString()
    );

    if (index === -1) {
      updatedCalendar.push({ date: date.toISOString(), isBooked: true });
    } else {
      updatedCalendar[index].isBooked = !updatedCalendar[index].isBooked;
    }

    setCalendar(updatedCalendar);
    axios.put(`/api/product/${productId}/calendar`, {
      calendar: updatedCalendar,
    });
  };

  return (
    <div>
      <p>hello world</p>
      <Calendar>
        {/* <div>
          {product.calendar && product.calendar[0] ? (
            <div className="calendar">
              {product.calendar &&
                product.calendar.map((d) => (
                  // {d.date}
                  <p>d.isBooked and is </p>
                  // <p>"isBooked"</p>}
                  // <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noCalendar">No Available Date</p>
          )}
          ;
        </div>
        ; */}
      </Calendar>
    </div>
    // {" "}

    /* // value={selectedDate}
    // onClickDay={handleDateClick}
    // tileDisabled={({ activeStartDate, date, view }) => {
    //   const dateString = date.toISOString();
    //   const disabled = calendar.some(
    //     (d) => d.date === dateString && d.isBooked
    //   );
    //   <div>
    //     {calendar.date && calendar.date[0] ? (
    //       <div className="calendar">
    //         {calendar.date &&
    //           calendar.date.map((d) => (
    //             // {d.date}
    //             <p>d.isBooked</p>
    //             // <ReviewCard key={review._id} review={review} />
    //           ))}
    //       </div>
    //     ) : (
    //       <p className="noCalendar">No Available Date</p>
    //     )}
    //     ;
    //   </div>;
    //   return disabled;
    // }} */
    // </Calendar>
  );
};

export default ProductCalendar;
