// src/MonthView.jsx
import React from "react";
import "./MonthView.css";
import logo from "./assets/logo.png";

function MonthView() {
  const events = {
    "2024-05-03": ["event 3"],
    "2024-05-15": ["event 2"],
    "2024-05-21": ["event 1"],
  };

  const renderDayEvents = (day) => {
    return (
      events[day]?.map((event, index) => (
        <div key={index} className="event-item">
          {event}
        </div>
      )) || []
    );
  };

  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="month-container">
      <header className="header">
        <img src={logo} className="logo" alt="Logo" />
        <h1>MAY 2024</h1>
        <div className="view-buttons">
          <button>Week</button>
          <button>Month</button>
          <button className="list">List</button>
        </div>
      </header>
      <div className="main-content">
        <aside className="left-bar">
          <div className="event-container">
            <button className="add-event-button">Add Event</button>
          </div>
          <div className="to-do-list">
            <h2>To Do List:</h2>
            <ul>
              <li>
                <label>
                  <input type="checkbox" checked readOnly /> Do laundry
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" /> Get groceries
                </label>
              </li>
            </ul>
          </div>
        </aside>
        <div className="month-main-content">
          <div className="month-grid">
            {daysInMonth.map((day) => (
              <div key={day} className="day-cell">
                <strong className="date">{`May ${day}`}</strong>
                {renderDayEvents(`2024-05-${day.toString().padStart(2, "0")}`)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MonthView;
