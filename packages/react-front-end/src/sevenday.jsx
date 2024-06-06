import { useState } from "react";
import "./sevenday.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

function sevenday() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <header className="header">
        <img src={logo} className="logo" alt="Logo" />
        <h1>MAY 2024</h1>
      </header>
      <div className="main-content">
        <aside className="sidebar">
          <button className="add-event-button">
            {<Link to="/event">Add Event</Link>}
          </button>
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
        <main className="content">
          <div className="calendar">
            <div className="timeline">
              {Array.from({ length: 10 }, (_, i) => (
                <div className="time-slot" key={i}>
                  {i + 1}:00
                </div>
              ))}
            </div>
            <div className="days">
              {[
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ].map((day, index) => (
                <div className="day" key={index}>
                  <div className="date">
                    <div className="date-num">{index + 1}</div>
                    <div className="date-day">{day}</div>
                  </div>
                  <div className="events">{/* Add events here */}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default sevenday;
