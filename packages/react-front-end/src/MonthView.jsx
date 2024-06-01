// src/MonthView.jsx
import React from "react";
import "./MonthView.css"; 
import logo from "./assets/logo.png";

function MonthView() {
  const events = {
    "2024-05-03": ["event 3"],
    "2024-05-15": ["event 2"],
    "2024-05-21": ["event 1"]
  };

 
  const renderDayEvents = (day) => {
    return events[day]?.map((event, index) => (
      <div key={index} className="event-item">{event}</div>
    )) || [];
  };

 
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="month-container">
      <header className="month-header">
        <img src={logo} className="month-logo" alt="Logo" />
        <h1>MAY 2024</h1>
      </header>
      <div className="month-main-content">
        <div className="month-grid">
          {daysInMonth.map(day => (
            <div key={day} className="day-cell">
              <strong className="date">{`May ${day}`}</strong>
              {renderDayEvents(`2024-05-${day.toString().padStart(2, '0')}`)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MonthView;

