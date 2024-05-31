// src/List.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./list.css";
import logo from "./assets/logo.png";

function List() {
  // const[events, setEvents] = useState([]);

  // function removeEvent(eventId) {
  //     fetch("http://localhost:8000/events/${userId}", {
  //         method: "DELETE",
  //     })
  //         .then((response) => {
  //             if (response.status === 204) {
  //                 const updated = events.filter((event) => {return event._id !== eventId;});
  //                 setEvents(updated);
  //             }
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         });
  // }

  // function fetchEvents() {
  //     const promise = fetch("http://localhost:8000/events/${userId}")
  //     return promise;
  // }

  // useEffect(() => {
  //     fetchEvents()
  //         .then((res) => res.json())
  //         .catch((json) => setEvents(json))
  //         .catch((error) => console.log(error));
  // }, [userId]);
  const events = {
    "2024-05-01": [
      { _id: 1, startTime: "10:00 AM", eventName: "Event 1" },
      { _id: 2, startTime: "11:00 AM", eventName: "Event 2" },
    ],
    "2024-05-02": [
      { _id: 3, startTime: "12:00 PM", eventName: "Event 3" },
      { _id: 4, startTime: "01:00 PM", eventName: "Event 4" },
    ],
  };
  return (
    <div className="container">
      <header className="header">
        <img src={logo} className="logo" alt="Logo" />
        <h1>MAY 2024</h1>
        <div className="view-buttons">
          <button>Week{/* <Link to="/week">Week</Link> */}</button>
          <button>Month{/* <Link to="/month">Month</Link> */}</button>
          <button className="list">
            List{/* <Link to="/month">Month</Link> */}
          </button>
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
        <div className="content">
          {Object.entries(events).map(([date, events]) => (
            <section key={date}>
              <h2 className="date">{date}:</h2>
              <ul>
                {events.map((event) => (
                  <li key={event._id}>
                    <strong className="event-details">{event.startTime}</strong>
                    <label className="event-details">{event.eventName}</label>
                    <button onClick={() => removeEvent(event._id)}></button>
                  </li>
                ))}
              </ul>
              <hr></hr>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
export default List;
