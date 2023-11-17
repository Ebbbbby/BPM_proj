import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import  DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big meeting",
    allDay: true,
    start: new Date(2023, 5, 0),
    end: new Date(2023, 5, 0),
  },

  {
    title: "Vacation",
    allDay: true,
    start: new Date(2023, 5, 7),
    end: new Date(2023, 5, 10),
  },

  {
    title: "Conference",
    allDay: true,
    start: new Date(2023, 5, 20),
    end: new Date(2023, 5, 23),
  },
];

const Scheduler = () => {
  const [newEvents, setNewEvents] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvents]);
    setNewEvents("")
  }
  //   const [events, setEvents] = useState([]);
  //   const [selectedDate, setSelectedDate] = useState(dayjs());
  //   const [selectedMonth, setSelectedMonth] = useState(dayjs());

  //   const prevMonth = () => {
  //     setSelectedMonth(selectedMonth.subtract(1, "month"));
  //   };

  //   const nextMonth = () => {
  //     setSelectedMonth(selectedMonth.add(1, "month"));
  //   };

  //   const daysInMonth = selectedMonth.daysInMonth();
  //   const firstDayOfMonth = selectedMonth.startOf('month').format('d');

  //   const calendarCells = [];
  //   const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  //   console.log(daysInMonth, 'Days in Month')
  //   console.log(firstDayOfMonth)

  return (
    <div>
      <h1>Calendar</h1>
      <h2>Add New Events</h2>
      <div>
        <input
          type="text"
          placeholder="Add title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvents?.title}
          onChange={(e) =>
            setNewEvents({ ...newEvents, title: e.target.value })
          }
        />

        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvents?.start}
          onChange={(start) => setNewEvents({ ...newEvents, start })}
        />

        <DatePicker
          placeholderText="End Date"
          selected={newEvents.end}
          onChange={(end) => setNewEvents({ ...newEvents, end })}
        />
        <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
    //     <div className=''>

    //       <div className='month_container'>
    //       <div className="back-btn">
    //         <BackButton />
    //       </div>
    //        <div className="grouped_items">
    //         <div className={DBStyle.btn_outline_container}>
    //           <button className={DBStyle.btn_outline}>Today</button>
    //         </div>
    //         <div className="chev_btns">
    //           <button onClick={prevMonth}>
    //             <CgChevronLeftO size={32} color="#305F32" fontWeight={200} />
    //           </button>
    //           <button onClick={nextMonth}>
    //             <CgChevronRightO size={32} color="#305F32" fontWeight={200} />
    //           </button>
    //         </div>
    //         <div className="selected_month">
    //           <h3>{selectedMonth.format("MMMM YYYY")}</h3>
    //         </div>
    //         <div className={DBStyle.btn_outline_container}>
    //           <button className={DBStyle.btn_outline}>
    //             Week
    //             <FiChevronDown />
    //           </button>
    //         </div>
    //         </div>
    //         <div className="submit_btn">
    //           <ActionButtons className={DashboardStyle?.button_cage_weight}>
    //             Submit
    //           </ActionButtons>
    //         </div>
    //       </div>

    //    {dayLabels?.map((day)=> {
    //     return
    //    })}

    //     </div>
  );
};

export default Scheduler;
