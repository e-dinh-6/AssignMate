// src/List.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./list.css";
import logo from "./assets/logo.png";

function List() {
  const [events, setEvents] = useState([]);
  const currentDate = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const today = currentDate.toLocaleDateString("en-US", options);

  function removeEvent(eventId) {
    console.log("remove: ", eventId);
    fetch(`http://localhost:8000/events/${eventId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          const updated = Object.values(events).flatMap((eventArray) =>
            eventArray.filter((event) => event._id !== eventId),
          );
          setEvents(updated);
        }
      })
      .catch((error) => {
        console.log("events: ", events);
        console.log(error);
      });
  }

  function fetchEvents() {
    const promise = fetch("http://localhost:8000/events");
    console.log(promise);
    return promise;
  }

  useEffect(() => {
    fetchEvents()
      .then((res) => res.json())
      .then((json) => {
        setEvents(json);
      })
      .catch((error) => console.log(error));
  }, []);

  //   const events = {
  //     "2024-05-01": [
  //       { _id: 1, startTime: "10:00 AM", eventName: "Event 1" },
  //       { _id: 2, startTime: "11:00 AM", eventName: "Event 2" },
  //     ],
  //     "2024-05-02": [
  //       { _id: 3, startTime: "12:00 PM", eventName: "Event 3" },
  //       { _id: 4, startTime: "01:00 PM", eventName: "Event 4" },
  //     ],
  //   };
  return (
    <div className="container">
      <header className="list-header">
        <img src={logo} className="logo" alt="Logo" />
        <div className="header-dates">
          <h1>MAY 2024</h1>
          <p>{today}</p>
        </div>
        <div className="view-buttons">
          <button>{<Link to="/sevenday">Week</Link>}</button>
          <button>Month{/* <Link to="/month">Month</Link> */}</button>
          <button className="list">List</button>
        </div>
      </header>

      <div className="main-content">
        <aside className="left-bar">
          <div className="event-container">
            <button className="add-event-button">
              {<Link to="/event">Add Event</Link>}
            </button>
          </div>
          <div className="to-do-list">
            <h2>To Do List:</h2>
            <ul>
              <li>
                <label>
                  <input type="checkbox" /> Do laundry
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
          {Object.entries(events).map(([date, dailyEvents]) => (
            <section key={date}>
              <h2 className="list-date">
                {new Intl.DateTimeFormat("en-US", { weekday: "long" })
                  .format(new Date(date))
                  .toUpperCase()}
                :
              </h2>
              <ul>
                {dailyEvents.map((event) => (
                  <li key={event._id}>
                    <strong className="event-details">
                      {new Date(event.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </strong>
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
