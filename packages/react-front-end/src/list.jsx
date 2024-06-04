// src/List.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./list.css";
import logo from "./assets/logo.png";

function List() {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [checkedTaskIds, setCheckedTaskIds] = useState([]);
  const currentDate = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const today = currentDate.toLocaleDateString("en-US", options);

  function removeEvent(eventId) {
    fetch(`https://assignmate7.azurewebsites.net/events/${eventId}`, {
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
        console.log(error);
      });
  }

  function handleCheck(taskId) {
    if (checkedTaskIds.includes(taskId)) {
      setCheckedTaskIds(checkedTaskIds.filter((id) => id !== taskId)); // Remove taskId from checkedTaskIds
    } else {
      setCheckedTaskIds([...checkedTaskIds, taskId]); // Add taskId to checkedTaskIds
    }
  }

  function removeTask(taskId) {
    console.log(taskId);
    fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          const updated = tasks.filter((task) => task._id !== taskId);
          setTasks(updated);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeCheckedTasks() {
    checkedTaskIds.forEach((taskId) => {
      removeTask(taskId);
    });
    setCheckedTaskIds([]);
  }

  function addTask(task) {
    postTask({ title: newTaskTitle })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .then((newTask) => {
        setTasks([...tasks, newTask]);
        setNewTaskTitle("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchEvents() {
    const promise = fetch("http://localhost:8000/events");
    return promise;
  }

  function fetchTasks() {
    const promise = fetch("http://localhost:8000/tasks");
    return promise;
  }

  function postTask(task) {
    const promise = fetch("http://localhost:8000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return promise;
  }

  useEffect(() => {
    fetchEvents()
      .then((res) => res.json())
      .then((json) => {
        setEvents(json);
      })
      .catch((error) => console.log(error));

    fetchTasks()
      .then((res) => res.json())
      .then((json) => setTasks(json))
      .catch((error) => console.log(error));
  }, []);

  const filteredEvents = Object.entries(events).reduce(
    (acc, [date, dailyEvents]) => {
      const eventDate = new Date(date);
      const eventYear = eventDate.getFullYear();
      const eventMonth = eventDate.getMonth();
      const eventDay = eventDate.getDate();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      // Compare only year, month, and day components
      if (
        eventYear > currentYear ||
        (eventYear === currentYear && eventMonth > currentMonth) ||
        (eventYear === currentYear &&
          eventMonth === currentMonth &&
          eventDay >= currentDay)
      ) {
        acc[date] = dailyEvents;
      }
      return acc;
    },
    {},
  );

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
          <h1>{monthYear}</h1>
          <p>{today}</p>
        </div>
        <div className="view-buttons">
          <button>{<Link to="/sevenday">Week</Link>}</button>
          <button>
            <Link to="/MonthView">Month</Link>
          </button>
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
              {tasks.map((task) => (
                <li key={task._id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={task.checked}
                      onChange={() => handleCheck(task._id)}
                    />{" "}
                    {task.title}
                  </label>
                </li>
              ))}
            </ul>
            <div className="bottom-left">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addTask();
                }}
              >
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter new task"
                  className="new-task"
                />
                <button type="submit" className="submit">
                  Add Task
                </button>
              </form>
              <button onClick={removeCheckedTasks} className="clean-tasks">
                Remove Completed
              </button>
            </div>
          </div>
        </aside>
        <div className="content">
          {Object.entries(filteredEvents).map(([date, dailyEvents]) => (
            <section key={date}>
              <h2 className="list-date">
                {new Date(date).toDateString() === currentDate.toDateString()
                  ? "TODAY"
                  : new Intl.DateTimeFormat("en-US", { weekday: "long" })
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
