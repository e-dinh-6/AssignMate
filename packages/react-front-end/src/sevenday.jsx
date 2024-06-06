import React, { useState, useEffect } from "react";
import "./sevenday.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

function sevenday() {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [checkedTaskIds, setCheckedTaskIds] = useState([]);
  const [startOfWeek, setStartOfWeek] = useState(getStartOfWeek(new Date()));
  const currentDate = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const today = currentDate.toLocaleDateString("en-US", options);

  function addAuthHeader(otherHeaders = {}) {
    const token = localStorage.getItem("token");
    if (!token) {
      return otherHeaders;
    } else {
      return {
        ...otherHeaders,
        Authorization: `Bearer ${token}`,
      };
    }
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
    fetch(`https://assignmate7.azurewebsites.net/tasks/${taskId}`, {
      method: "DELETE",
      headers: addAuthHeader(),
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
    const promise = fetch("https://assignmate7.azurewebsites.net/events", {
      headers: addAuthHeader(),
    });
    return promise;
  }

  function fetchTasks() {
    const promise = fetch("https://assignmate7.azurewebsites.net/tasks", {
      headers: addAuthHeader(),
    });
    return promise;
  }

  function postTask(task) {
    const promise = fetch("https://assignmate7.azurewebsites.net/tasks", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(task),
    });
    return promise;
  }

  useEffect(() => {
    fetchTasks()
      .then((res) => res.json())
      .then((json) => setTasks(json))
      .catch((error) => console.log(error));

    fetchEvents()
      .then((res) => res.json())
      .then((json) => setEvents(json))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Fetch events again when startOfWeek changes
    fetchEvents()
      .then((res) => res.json())
      .then((json) => setEvents(json))
      .catch((error) => console.log(error));
  }, [startOfWeek]);

  // Helper function to get the start of the current week (Sunday)
  function getStartOfWeek(date) {
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day;
    return new Date(startDate.setDate(diff));
  }

  function getWeekDates(startDate) {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return date;
    });
  }

  const weekDates = getWeekDates(startOfWeek);

  const arrayData = Object.entries(events).reduce((acc, [date, events]) => {
    events.forEach((event) => {
      const newEvent = { ...event, date: new Date(date).toISOString() };
      acc.push(newEvent);
    });
    return acc;
  }, []);

  const eventsForWeek = weekDates.reduce((acc, date) => {
    const dateString = date.toISOString().split("T")[0];
    acc[dateString] = arrayData.filter(
      (event) =>
        new Date(event.date).toISOString().split("T")[0] === dateString,
    );
    return acc;
  }, {});

  // Generate dates for the current week
  function previousWeek() {
    const newStartOfWeek = new Date(startOfWeek);
    newStartOfWeek.setDate(startOfWeek.getDate() - 7);
    setStartOfWeek(newStartOfWeek);
  }

  function nextWeek() {
    const newStartOfWeek = new Date(startOfWeek);
    newStartOfWeek.setDate(startOfWeek.getDate() + 7);
    setStartOfWeek(newStartOfWeek);
  }

  function getMajorityMonth(dates) {
    const monthCounts = dates.reduce((acc, date) => {
      const month = date.toLocaleString("en-US", { month: "long" });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(monthCounts).reduce((a, b) =>
      monthCounts[a] > monthCounts[b] ? a : b,
    );
  }

  const majorityMonth = getMajorityMonth(weekDates);

  return (
    <div className="container">
      <header className="list-header">
        <img src={logo} className="logo" alt="Logo" />
        <div className="header-dates">
          <h1>{majorityMonth}</h1>
        </div>
        <div className="week-navigation">
          <div className="month-picker"></div>
          <div>
            <button onClick={previousWeek}>&#9664;</button>
            <button onClick={nextWeek}>&#9654;</button>
          </div>
        </div>
        <div className="view-buttons">
          <button className="sevenday">Week</button>
          <button>
            <Link to="/MonthView">Month</Link>
          </button>
          <button>
            <Link to="/list">List</Link>
          </button>
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
        <main className="content">
          <div className="calendar">
            <div className="days">
              {weekDates.map((date, index) => {
                const dateString = date.toISOString().split("T")[0];
                const dayName = date.toLocaleDateString("en-US", {
                  weekday: "long",
                });
                return (
                  <div className="day" key={index}>
                    <div className="date">
                      <div className="date-num">{date.getDate()}</div>
                      <div className="date-day">{dayName}</div>
                    </div>
                    <div className="events">
                      <ul>
                        {eventsForWeek[dateString].map((event) => (
                          <li key={event._id}>
                            <div className="event-box">
                              <strong className="event-details">
                                {event.startTime &&
                                  new Date(event.startTime).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}
                              </strong>
                              <label className="event-details">
                                {event.eventName}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default sevenday;
