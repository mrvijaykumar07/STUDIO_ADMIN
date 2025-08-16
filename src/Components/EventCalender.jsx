

import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, addMonths } from "date-fns";


const eventsData = {
  // August 2025
  "2025-08-05": [{ name: "Priya & Raj Wedding", cameraman: "Rohan", location: "Delhi", time: "10:00 AM" }],
  "2025-08-07": [{ name: "Corporate Meeting", cameraman: "Sahil", location: "Bangalore", time: "2:00 PM" }],
  "2025-08-12": [
    { name: "Aisha & Dev Pre-Wedding Shoot", cameraman: "Arjun", location: "Mumbai", time: "3:00 PM" },
    { name: "Startup Pitch Event", cameraman: "Sahil", location: "Bangalore", time: "11:00 AM" },
  ],
  "2025-08-15": [
    { name: "Fashion Shoot", cameraman: "Ravi", location: "Delhi", time: "1:00 PM" },
    { name: "Product Launch", cameraman: "Ankit", location: "Pune", time: "4:00 PM" },
    { name: "Wedding Event", cameraman: "Vikram", location: "Chennai", time: "5:00 PM" },
  ],
  "2025-08-18": [
    { name: "Team Outing", cameraman: "Vikram", location: "Chennai", time: "5:00 PM" },
    { name: "Sunita & Raj Anniversary", cameraman: "Rohit", location: "Kolkata", time: "6:00 PM" },
  ],
  "2025-08-20": [{ name: "New Wedding Event", cameraman: "Vikram", location: "Chennai", time: "4:00 PM" }],
  "2025-08-25": [{ name: "Birthday Shoot", cameraman: "Rohit", location: "Bangalore", time: "6:00 PM" }],

  // September 2025
  "2025-09-02": [
    { name: "Conference", cameraman: "Sahil", location: "Bangalore", time: "11:00 AM" },
    { name: "Corporate Workshop", cameraman: "Arjun", location: "Mumbai", time: "2:00 PM" },
  ],
  "2025-09-05": [
    { name: "Wedding Shoot", cameraman: "Ravi", location: "Delhi", time: "10:00 AM" },
    { name: "Birthday Party", cameraman: "Sahil", location: "Bangalore", time: "1:00 PM" },
  ],
  "2025-09-10": [
    { name: "Music Video Shoot", cameraman: "Ankit", location: "Pune", time: "3:00 PM" },
    { name: "Corporate Event", cameraman: "Arjun", location: "Mumbai", time: "5:00 PM" },
  ],
  "2025-09-15": [
    { name: "Product Launch", cameraman: "Vikram", location: "Chennai", time: "2:00 PM" },
    { name: "Corporate Party", cameraman: "Rohit", location: "Kolkata", time: "5:00 PM" },
    { name: "Fashion Event", cameraman: "Arjun", location: "Mumbai", time: "6:00 PM" },
  ],
  "2025-09-20": [{ name: "Wedding Event", cameraman: "Sahil", location: "Bangalore", time: "4:00 PM" }],

  // October 2025
  "2025-10-01": [{ name: "Corporate Meeting", cameraman: "Ravi", location: "Delhi", time: "11:00 AM" }],
  "2025-10-03": [
    { name: "Wedding Shoot", cameraman: "Ankit", location: "Pune", time: "9:00 AM" },
    { name: "Product Photography", cameraman: "Vikram", location: "Chennai", time: "2:00 PM" },
  ],
  "2025-10-05": [{ name: "Music Video Shoot", cameraman: "Rohan", location: "Delhi", time: "10:00 AM" }],
  "2025-10-07": [
    { name: "Birthday Event", cameraman: "Rohit", location: "Bangalore", time: "1:00 PM" },
    { name: "Music Video Shoot", cameraman: "Arjun", location: "Mumbai", time: "3:00 PM" },
    { name: "Wedding Party", cameraman: "Sahil", location: "Delhi", time: "5:00 PM" },
  ],
  "2025-10-12": [{ name: "Dance & Fashion Shoot", cameraman: "Ravi", location: "Delhi", time: "4:00 PM" }],
  "2025-10-18": [{ name: "Corporate Launch", cameraman: "Ankit", location: "Pune", time: "11:00 AM" }],
  "2025-10-25": [
    { name: "Wedding Shoot", cameraman: "Vikram", location: "Chennai", time: "10:00 AM" },
    { name: "Birthday Shoot", cameraman: "Rohit", location: "Bangalore", time: "2:00 PM" },
  ],
};








const EventCalendar = ({ startMonth = new Date().getMonth() + 1, startYear = new Date().getFullYear() }) => {
  const [hoveredDate, setHoveredDate] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const scrollRef = useRef(null);

  const getMonthDays = (month, year) => {
    const start = startOfMonth(new Date(year, month - 1));
    const end = endOfMonth(new Date(year, month - 1));
    return eachDayOfInterval({ start, end });
  };

  const months = [0, 1, 2].map((i) => addMonths(new Date(startYear, startMonth - 1), i));
  const getDateKey = (date) => format(date, "yyyy-MM-dd");

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
   <div className=" md:p-4 relative">
  <h2 className="text-2xl font-bold flex items-center gap-2 text-pink-600 mb-4">
    <FaCalendarAlt /> Event Calendar
  </h2>

  {/* Arrow Buttons */}
  <button
    onClick={() => scroll("left")}
    className="hidden sm:flex items-center justify-center absolute top-1/2 left-0 transform -translate-y-1/2 bg-white border rounded-full w-8 h-8 shadow z-20 hover:bg-gray-100"
  >
    <FaChevronLeft />
  </button>
  <button
    onClick={() => scroll("right")}
    className="hidden sm:flex items-center justify-center absolute top-1/2 right-0 transform -translate-y-1/2 bg-white border rounded-full w-8 h-8 shadow z-20 hover:bg-gray-100"
  >
    <FaChevronRight />
  </button>

  {/* Months Scroll / Grid for Mobile */}
  <div
    ref={scrollRef}
    className="grid sm:flex grid-cols-1 sm:grid-cols-none sm:flex-row gap-6 sm:gap-6 pb-4 sm:overflow-x-auto scrollbar-none"
  >
    {months.map((monthDate, mIdx) => {
      const year = monthDate.getFullYear();
      const month = monthDate.getMonth() + 1;
      const days = getMonthDays(month, year);

      return (
        <div
          key={mIdx}
          className="min-w-[200px] bg-white shadow rounded-lg p-2 flex-shrink-0 sm:w-auto w-full"
        >
          <h3 className="text-center font-semibold mb-2 text-pink-600">{format(monthDate, "MMMM yyyy")}</h3>
     <div className="grid grid-cols-7 gap-1.5">
  {days.map((day) => {
    const key = getDateKey(day);
    const dayEvents = eventsData[key] || [];

    return (
      <div
        key={key}
        onMouseEnter={(e) => {
          setHoveredDate(key);
          const rect = e.currentTarget.getBoundingClientRect();
          setTooltipPos({ top: rect.top, left: rect.left + rect.width / 2 });
        }}
        onMouseLeave={() => setHoveredDate(null)}
        className={`relative border rounded-lg w-9 md:w-12 h-10 flex-1 flex flex-col items-center justify-center text-xs cursor-pointer transition-all
          ${dayEvents.length > 0 ? "bg-pink-100 border-pink-300" : "bg-gray-100 hover:bg-gray-200"}`}
      >
        <span className="font-semibold">{day.getDate()}</span>
        {/* Event indicators */}
        {dayEvents.length > 0 && (
          <div className="mt-1 flex flex-wrap justify-center gap-0.5">
            {dayEvents.map((_, idx) => (
              <div key={idx} className="md:w-1.5 md:h-1.5 w-1 h-1 rounded-full bg-pink-600"></div>
            ))}
          </div>
        )}
      </div>
    );
  })}
</div>

        </div>
      );
    })}
  </div>

{/* Tooltip Portal */}
{hoveredDate && eventsData[hoveredDate] &&
  ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: tooltipPos.top - 120, // show above the day
        left: tooltipPos.left,
        transform: "translateX(-50%)",
        zIndex: 1000,
        pointerEvents: "none",
      }}
      className="max-w-[90vw] bg-white border border-gray-300 shadow-2xl rounded-lg p-3 text-xs sm:text-sm"
    >
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-white"></div>
      <p className="font-semibold text-pink-600 mb-2">{format(new Date(hoveredDate), "MMMM dd, yyyy")}</p>

      {/* Events in multiple rows without scrollbar */}
      <div className="flex flex-wrap gap-2">
        {eventsData[hoveredDate]
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((ev, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-2 min-w-[120px] flex-1">
              <p className="font-semibold">{ev.name}</p>
              <p>Cameraman: {ev.cameraman}</p>
              <p>Location: {ev.location}</p>
              <p>Time: {ev.time}</p>
            </div>
          ))}
      </div>
    </div>,
    document.body
  )}


  {/* CSS for hiding scrollbar */}
  <style>
    {`
      .scrollbar-none::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-none {
        -ms-overflow-style: none; 
        scrollbar-width: none; 
      }
    `}
  </style>
</div>

  );
};

export default EventCalendar;
