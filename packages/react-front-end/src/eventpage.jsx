import React, { useState } from 'react';
import './event.css';

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    tags: [],
    date: '',
    timeStart: '',
    timeEnd: '',
    status: 'In Progress',
    description: ''
  });

  const [tags, setTags] = useState([
    { name: 'CSC 307', color: '#FF5733' },
  ]);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#000000');
  const [events, setEvents] = useState([
    { title: 'Event Title 1', tags: [] },
    { title: 'Event Title 2', tags: [] },
  ]);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [showNewTagModal, setShowNewTagModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    if (type === 'select-multiple') {
      const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setEvents([...events, { title: formData.title, tags: formData.tags }]);
    // Reset form fields
    setFormData({
      title: '',
      tags: [],
      date: '',
      timeStart: '',
      timeEnd: '',
      status: 'In Progress',
      description: ''
    });
    setSelectedEvent(null);
  };

  const handleAddTag = () => {
    if (newTagName.trim() !== '') {
      setTags([...tags, { name: newTagName, color: newTagColor }]);
      setNewTagName('');
      setNewTagColor('#800080');
      setShowNewTagModal(false);
    } else {
      alert('Tag name cannot be empty');
    }
  };

  const toggleTagDropdown = () => {
    setShowTagDropdown(!showTagDropdown);
  };

  const handleTagSelect = (tag) => {
    if (formData.tags.includes(tag.name)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter(t => t !== tag.name)
      });
    } else {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag.name]
      });
    }
  };

  const handleEdit = () => {
    setFormData(selectedEvent);
    setSelectedEvent(null);
  };

  return (
    <div className="event-form-container">
      <div className="sidebar">
        <h2>Other Events:</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index} className="event-name" onClick={() => setSelectedEvent(event)}>
              {event.title} ({event.tags.join(', ')})
            </li>
          ))}
        </ul>
      </div>
      <form className="event-form" onSubmit={handleSubmit}>
        <h1>{selectedEvent ? "View Event" : "Create Event"}</h1>
        {selectedEvent ? (
          <div>
            <div className="form-group">
              <label>Title:</label>
              <div>{selectedEvent.title}</div>
            </div>
            <div className="form-group">
              <label>Tags:</label>
              <div>{selectedEvent.tags.join(', ')}</div>
            </div>
            <div className="form-group">
              <label>Date:</label>
              <div>{selectedEvent.date}</div>
            </div>
            <div className="form-group">
              <label>Start Time:</label>
              <div>{selectedEvent.timeStart}</div>
            </div>
            <div className="form-group">
              <label>End Time:</label>
              <div>{selectedEvent.timeEnd}</div>
            </div>
            <div className="form-group">
              <label>Description:</label>
              <div>{selectedEvent.description}</div>
            </div>
            <button type="button" onClick={handleEdit} className="create-btn">Edit Event</button>
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
                <button type="button" onClick={toggleTagDropdown} className="tag-btn">
                  Select Tags
                </button>
                {showTagDropdown && (
                  <div className="tag-dropdown">
                    {tags.map((tag, index) => (
                      <div key={index} className="tag-option" onClick={() => handleTagSelect(tag)}>
                        <input
                          type="checkbox"
                          checked={formData.tags.includes(tag.name)}
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
              <button type="button" onClick={() => setShowNewTagModal(true)} className="tag-btn">Create New Tag</button>
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
                  <input
                    type="color"
                    value={newTagColor}
                    onChange={(e) => setNewTagColor(e.target.value)}
                  />
                  <button type="button" onClick={handleAddTag} className="tag-btn">Add Tag</button>
                  <button type="button" onClick={() => setShowNewTagModal(false)} className="tag-btn">Cancel</button>
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
                placeholder="Description"
              />
            </div>
            <button type="submit" className="create-btn">Create Event</button>
          </div>
        )}
      </form>
    </div>
  );
};


export default EventForm;
