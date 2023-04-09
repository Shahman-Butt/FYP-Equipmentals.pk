// import React from "react";

// function DateList({ dates }) {
//   return (
//     <ul>
//       {Object.entries(dates).map(([key, value]) => (
//         <li key={key}>
//           {value.date.toDateString()} - Available: {value.available.toString()}
//         </li>
//       ))}
//     </ul>
//   );
// }

// function Dates() {
//   const dateDict = {};
//   // Get current date
//   const currentDate = new Date();
//   // Loop through next 30 days and add to dictionary
//   for (let i = 0; i < 30; i++) {
//     const date = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() + i
//     );
//     dateDict[date.toISOString().slice(0, 10)] = { date, available: false };
//   }

//   return <DateList dates={dateDict} />;
// }

// export default Dates;
