/* MonthView.jsx */
import React, { useState, useEffect } from "react";
import "./MonthView.css";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";

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

function MonthView() {
  const [events, setEvents] = useState({});
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [checkedTaskIds, setCheckedTaskIds] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchEvents();
    fetchTasks();
    fetchTags();
  }, [currentDate]);

  const fetchEvents = () => {
    fetch("http://localhost:8000/events", {
      headers: addAuthHeader(),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const arrayData = Object.entries(data).reduce((acc, [date, events]) => {
          events.forEach((event) => {
            const newEvent = { ...event, date: new Date(date).toISOString() };
            acc.push(newEvent);
          });
          return acc;
        }, []);
        const filteredEvents = filterEventsByMonth(arrayData, currentDate);
        const eventsByDate = organizeEventsByDate(filteredEvents);
        setEvents(eventsByDate);
      })
      .catch((error) => console.error("Failed to fetch events:", error));
  };

  const fetchTasks = () => {
    fetch("https://assignmate7.azurewebsites.net/tasks", {
      headers: addAuthHeader(),
    })
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Failed to fetch tasks:", error));
  };

  const fetchTags = () => {
    fetch("https://assignmate7.azurewebsites.net/tag", {
      headers: addAuthHeader(),
    })
      .then((response) => response.json())
      .then((data) => setTags(data))
      .catch((error) => console.error("Failed to fetch tags:", error));
  };

  const postTask = (task) => {
    return fetch("https://assignmate7.azurewebsites.net/tasks", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(task),
    });
  };

  const filterEventsByMonth = (events, date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
  };

  const organizeEventsByDate = (events) => {
    return events.reduce((acc, event) => {
      const eventDate = event.date.split("T")[0];
      acc[eventDate] = acc[eventDate] || [];
      acc[eventDate].push(event);
      return acc;
    }, {});
  };

  const handleMonthChange = (offset) => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1),
    );
  };

  const getTagColor = (tagId) => {
    const tag = tags.find((t) => t._id.$oid === tagId);
    return tag ? tag.color : "#ADD8E6"; // default color if tag not found
  };

  const getTextColor = (backgroundColor) => {
    const color =
      backgroundColor.charAt(0) === "#"
        ? backgroundColor.substring(1, 7)
        : backgroundColor;
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155 ? "#000000" : "#FFFFFF";
  };

  const renderDayEvents = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    return (
      events[dateKey]?.map((event, index) => {
        const backgroundColor =
          event.tag && event.tag[0] ? getTagColor(event.tag[0]) : getTagColor();
        const textColor = getTextColor(backgroundColor);
        return (
          <div
            key={index}
            className="event-item"
            style={{ backgroundColor, color: textColor }}
          >
            {event.eventName}
          </div>
        );
      }) || []
    );
  };

  const addTask = () => {
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
  };

  const handleCheck = (taskId) => {
    if (checkedTaskIds.includes(taskId)) {
      setCheckedTaskIds(checkedTaskIds.filter((id) => id !== taskId));
    } else {
      setCheckedTaskIds([...checkedTaskIds, taskId]);
    }
  };

  const removeCheckedTasks = () => {
    checkedTaskIds.forEach((taskId) => {
      removeTask(taskId);
    });
    setCheckedTaskIds([]);
  };

  const removeTask = (taskId) => {
    fetch(`http://localhost:8000/tasks/${taskId}`, {
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
  };

  const daysInMonth = Array.from(
    {
      length: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      ).getDate(),
    },
    (_, i) => i + 1,
  );
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const startDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();
  const emptyCells = Array.from({ length: startDay }, (_, i) => (
    <div key={`empty-${i}`} className="day-cell empty"></div>
  ));
  const dayCells = daysInMonth.map((day) => (
    <div key={day} className="day-cell">
      <strong className="date">{`${day}`}</strong>
      {renderDayEvents(day)}
    </div>
  ));

  return (
    <div className="month-container">
      <header className="month-header">
        <img src={logo} className="logo" alt="Logo" />
        <div className="month-year-navigator">
          <h1>{`${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`}</h1>
          <button className="Mbutton" onClick={() => handleMonthChange(-1)}>
            &lt;
          </button>
          <button className="Mbutton" onClick={() => handleMonthChange(1)}>
            &gt;
          </button>
        </div>
        <div className="view-buttons">
          <button>{<Link to="/sevenday">Week</Link>}</button>
          <button className="list selected">
            <Link to="/MonthView">Month</Link>
          </button>
          <button>
            <Link to="/list">List</Link>
          </button>
        </div>
      </header>
      <div className="month-main-content">
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
                      checked={checkedTaskIds.includes(task._id)}
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
        <div className="month-grid-container">
          <div className="days-of-week">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="day-name">
                {day}
              </div>
            ))}
          </div>
          <div className="month-grid">{emptyCells.concat(dayCells)}</div>
        </div>
      </div>
    </div>
  );
}

export default MonthView;
