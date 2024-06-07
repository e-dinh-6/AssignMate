import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./event.css";

function EventForm() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [checkedTags, setCheckedTags] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    tags: [],
    date: "",
    timeStart: "",
    timeEnd: "",
    status: "In Progress",
    description: "",
  });
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#000000");
  const [events, setEvents] = useState([]); // Initialize as an empty array
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showNewTagModal, setShowNewTagModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    fetchEvents();
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.eventName || "",
        tags: selectedEvent.tags.map((tag) => tag._id) || [], // Make sure to map tag IDs to an array
        date: selectedEvent.date ? selectedEvent.date.split("T")[0] : "",
        timeStart: selectedEvent.startTime
          ? selectedEvent.startTime.split("T")[1].substring(0, 5)
          : "",
        timeEnd: selectedEvent.endTime
          ? selectedEvent.endTime.split("T")[1].substring(0, 5)
          : "",
        status: selectedEvent.status || "In Progress",
        description: selectedEvent.description || "",
      });
      const initialCheckedTags = {};
      selectedEvent.tags.forEach((tag) => {
        initialCheckedTags[tag._id] = true;
      });
      setCheckedTags(initialCheckedTags);
      setIsEditMode(true);
    } else {
      resetForm();
    }
  }, [selectedEvent]);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "https://assignmate7.azurewebsites.net/events",
        {
          headers: addAuthHeader(),
        },
      );
      if (!response.ok)
        throw new Error(
          `Failed to fetch events: ${response.status} ${response.statusText}`,
        );
      const data = await response.json();
      const arrayData = Object.entries(data).reduce((acc, [date, events]) => {
        events.forEach((event) => {
          const newEvent = { ...event, date: new Date(date).toISOString() };
          acc.push(newEvent);
        });
        return acc;
      }, []);
      setEvents(arrayData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(
        "https://assignmate7.azurewebsites.net/tag",
        {
          headers: addAuthHeader(),
        },
      );
      if (!response.ok)
        throw new Error(
          `Failed to fetch tags: ${response.status} ${response.statusText}`,
        );
      const data = await response.json();
      setTags(data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    if (type === "select-multiple") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedTags = formData.tags.filter(
      (tag) => tag.name && typeof tag.name === "string",
    );

    const eventToSubmit = {
      eventName: formData.title,
      tags: formattedTags,
      date: new Date(`${formData.date}T00:00:00Z`), // Ensure date is in ISO format
      startTime: new Date(`${formData.date}T${formData.timeStart}:00Z`), // Ensure time is in ISO format
      endTime: new Date(`${formData.date}T${formData.timeEnd}:00Z`), // Ensure time is in ISO format
      status: formData.status,
      description: formData.description,
    };

    const method = isEditMode ? "PUT" : "POST";
    const url = isEditMode
      ? "https://assignmate7.azurewebsites.net/${selectedEvent._id}"
      : "https://assignmate7.azurewebsites.net/events";

    fetch(url, {
      method: method,
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(eventToSubmit),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        setCheckedTags({});
        return response.json();
      })
      .then((data) => {
        fetchEvents(); // Refresh events list
        resetForm();
        setSelectedEvent(null); // Reset form
        setIsEditMode(false);
      })

      .catch((error) => console.error("Error submitting event:", error));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      tags: [],
      date: "",
      timeStart: "",
      timeEnd: "",
      status: "In Progress",
      description: "",
    });
  };

  const handleAddTag = () => {
    const newTag = {
      name: newTagName,
      color: newTagColor,
    };

    fetch("https://assignmate7.azurewebsites.net/tag", {
      method: "POST",
      headers: addAuthHeader({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(newTag),
    })
      .then((response) => response.json())
      .then((data) => {
        // Ensure the new tag is added to the list
        setTags([...tags, data]);
        setNewTagName("");
        setNewTagColor("#000000");
        setShowNewTagModal(false);
      })
      .catch((error) => console.error("Error adding tag:", error));
  };

  const handleCheckboxChange = (tagId, isChecked) => {
    setCheckedTags((prevState) => ({ ...prevState, [tagId]: isChecked }));

    if (isChecked) {
      setFormData((prevState) => ({
        ...prevState,
        tags: [...prevState.tags, tagId],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        tags: prevState.tags.filter((id) => id !== tagId),
      }));
    }
  };

  const toggleTagDropdown = () => {
    setShowTagDropdown(!showTagDropdown);
  };

  const handleEdit = () => {
    if (selectedEvent) {
      setFormData({
        title: selectedEvent.eventName || "",
        tags: selectedEvent.tags || [],
        date: selectedEvent.date ? selectedEvent.date.split("T")[0] : "",
        timeStart: selectedEvent.startTime
          ? selectedEvent.startTime.split("T")[1]?.substring(0, 5)
          : "",
        timeEnd: selectedEvent.endTime
          ? selectedEvent.endTime.split("T")[1]?.substring(0, 5)
          : "",
        status: selectedEvent.status || "In Progress",
        description: selectedEvent.description || "",
      });
      setIsEditMode(true);
    }
  };

  const handleCancelEdit = () => {
    setSelectedEvent(null);
    setIsEditMode(false);
  };

  console.log(events);

  return (
    <div className="event-form-container">
      <div className="back-button-container">
        <button onClick={() => navigate("/list")} className="back-button">
          Back to List
        </button>
      </div>
      <div className="sidebar">
        <h2>Other Events:</h2>
        <ul>
          {events &&
            events.map((event) => (
              <li
                key={event._id}
                className="event-name"
                onClick={() => setSelectedEvent(event)}
              >
                {event.eventName} (
                {event.tags ? event.tags.map((tag) => tag.name).join(", ") : ""}
                )
              </li>
            ))}
        </ul>
      </div>
      <form className="event-form" onSubmit={handleSubmit}>
        <h1>
          {selectedEvent && !isEditMode
            ? "View Event"
            : isEditMode
              ? "Edit Event"
              : "Create Event"}
        </h1>
        {selectedEvent && !isEditMode ? (
          <div>
            <div className="form-group">
              <label>Title:</label>
              <div>{selectedEvent.eventName}</div>
            </div>
            <div className="form-group">
              <label>Tags:</label>
              <div>{selectedEvent.tags?.join(", ")}</div>{" "}
              {/* Add optional chaining here */}
            </div>
            <div className="form-group">
              <label>Date:</label>
              <div>{selectedEvent.date.split("T")[0]}</div>
            </div>
            <div className="form-group">
              <label>Start Time:</label>
              <div>
                {selectedEvent.startTime
                  ? selectedEvent.startTime.split("T")[1]?.substring(0, 5)
                  : ""}
              </div>
            </div>
            <div className="form-group">
              <label>End Time:</label>
              <div>
                {selectedEvent.endTime
                  ? selectedEvent.endTime.split("T")[1]?.substring(0, 5)
                  : ""}
              </div>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <div className="event-description-container">
                {selectedEvent.description}
              </div>
            </div>
            <button type="button" onClick={handleEdit} className="create-btn">
              Edit Event
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Event Title"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tags">Tags:</label>
              <div className="tag-selector">
                <button
                  type="button"
                  onClick={toggleTagDropdown}
                  className="tag-btn"
                >
                  Select Tags
                </button>
                {showTagDropdown && (
                  <div className="tag-dropdown">
                    {tags.map((tag) => (
                      <div
                        key={tag._id}
                        className="tag-option"
                        onClick={() => handleCheckboxChange(tag._id)}
                      >
                        <input
                          type="checkbox"
                          checked={checkedTags[tag._id]}
                          onChange={(e) =>
                            handleCheckboxChange(tag._id, e.target.checked)
                          }
                          readOnly
                        />
                        <span style={{ color: tag.color }}>{tag.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <button
                type="button"
                onClick={() => setShowNewTagModal(true)}
                className="tag-btn"
              >
                Create New Tag
              </button>
            </div>
            {showNewTagModal && (
              <div className="modal">
                <div className="modal-content">
                  <h2>Create New Tag</h2>
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="New Tag Name"
                  />
                  <div className="tag-color">
                    <label htmlFor="color">Select a color:</label>
                    <input
                      type="color"
                      value={newTagColor}
                      onChange={(e) => setNewTagColor(e.target.value)}
                    />
                  </div>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="tag-btn"
                    >
                      Add Tag
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewTagModal(false)}
                      className="tag-btn"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeStart">Start Time:</label>
              <input
                type="time"
                name="timeStart"
                value={formData.timeStart}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="timeEnd">End Time:</label>
              <input
                type="time"
                name="timeEnd"
                value={formData.timeEnd}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Event Description"
              ></textarea>
            </div>
            <div className="edit-event">
              <button type="submit" className="create-btn">
                {isEditMode ? "Update Event" : "Create Event"}
              </button>
              {isEditMode && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="create-btn"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default EventForm;
