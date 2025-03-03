// import { Eventcalendar, getJson, setOptions, Toast } from '@mobiscroll/react';
// import { useCallback, useEffect, useMemo, useState } from 'react';
// import "@mobiscroll/react/dist/css/mobiscroll.min.css"; // Import Mobiscroll styles
// import './Calendars.css';

// setOptions({
//   theme: 'ios',
//   themeVariant: 'light'
// });

// function Calendars() {
//   const [ setEvents] = useState([]);
//   const [isToastOpen, setToastOpen] = useState(false);
//   const [toastText, setToastText] = useState();

//   const handleToastClose = useCallback(() => {
//     setToastOpen(false);
//   }, []);

//   const handleEventClick = useCallback((args) => {
//     setToastText(args.event.title);
//     setToastOpen(true);
//   }, []);

//   const myView = useMemo(() => ({ calendar: { labels: true } }), []);

//   useEffect(() => {
//     getJson(
//       'https://trial.mobiscroll.com/events/?vers=5',
//       (events) => {
//         setEvents(events);
//       },
//       'jsonp',
//     );
//   });

//   // Function to return the correct class for each day
//   const renderDay = useCallback((args) => {
//     const date = new Date(args.date);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
//     const isToday = date.getTime() === today.getTime();
//     const isSunday = date.getDay() === 0; // Check if it's Sunday

//     return (
//       <div className={`custom-day ${isToday ? 'today-cell' : isSunday ? 'sunday-cell' : 'other-day-cell'}`}>
//         <span className="date-text">{date.getDate()}</span> {/* ✅ Display Date */}
//       </div>
//     );
//   }, []);

//   return (
//     <>
//       <div style={{ height: '40%', width: '80%', maxWidth: '1100px', maxHeight: '300px', marginLeft: 'auto', marginRight: '20px', borderColor: 'black', borderRadius: '10px' , color:'black'}}>
//         <h2 className="notice">⚠ Notice :</h2>
//         <Eventcalendar
//           clickToCreate={false}
//           dragToCreate={false}
//           dragToMove={false}
//           dragToResize={false}
//           eventDelete={false}
//           data={false}
//           view={myView}
//           onEventClick={handleEventClick}
//           renderDay={renderDay} // Applying dynamic class
//         />
//       </div>
//       <Toast message={toastText} isOpen={isToastOpen} onClose={handleToastClose} />
//     </>
//   );
// }

// export default Calendars;

import { Eventcalendar, getJson, setOptions, Toast } from '@mobiscroll/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import "@mobiscroll/react/dist/css/mobiscroll.min.css"; // Import Mobiscroll styles
import './Calendars.css';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

function Calendars() {
  const [ setEvents] = useState([]);
  const [isToastOpen, setToastOpen] = useState(false);
  const [toastText, setToastText] = useState();

  const handleToastClose = useCallback(() => {
    setToastOpen(false);
  }, []);

  const handleEventClick = useCallback((args) => {
    setToastText(args.event.title);
    setToastOpen(true);
  }, []);

  const myView = useMemo(() => ({ calendar: { labels: true } }), []);

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  });

  const renderDay = useCallback((args) => {
    const date = new Date(args.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const isToday = date.getTime() === today.getTime();
    const isSunday = date.getDay() === 0; // Check if it's Sunday
  
    return (
      <div
        className={`custom-day ${isToday ? 'today-cell' : isSunday ? 'sunday-cell' : 'other-day-cell'}`}
        style={{ position: 'relative' }} // Added relative positioning to the parent div
      >
        <span
          className="date-text"
          style={{
            position: 'absolute', // Positioning the date at the top-right corner
            top: '5px',
            right: '5px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#333', // You can customize this color if needed
          }}
        >
          {date.getDate()}
        </span>
      </div>
    );
  }, []);
  

  return (
    <>
      <div style={{ height: '40%', width: '80%', maxWidth: '1100px', maxHeight: '300px', marginLeft: 'auto', marginRight: '20px', borderColor: 'black', borderRadius: '10px' , color:'black'}}>
        <h2 className="notice">⚠ Notice :</h2>
        <Eventcalendar
          clickToCreate={false}
          dragToCreate={false}
          dragToMove={false}
          dragToResize={false}
          eventDelete={false}
          data={false}
          view={myView}
          onEventClick={handleEventClick}
          renderDay={renderDay} // Applying dynamic class
        />
      </div>
      <Toast message={toastText} isOpen={isToastOpen} onClose={handleToastClose} />
    </>
  );
}

export default Calendars;
