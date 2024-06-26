// services.js
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import databaseModel from "./database.js"; //eslint-disable-line

const { User, Event, Tag, Task } = databaseModel;

mongoose.set("debug", true);
dotenv.config();
const { MONGODB_URL } = process.env;

/* istanbul ignore next */
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to cloud db");
  })
  .catch((error) => {
    console.error("Error connecting to the cloud database:", error);
    mongoose
      .connect("mongodb://localhost:27017/asignmate", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((error) => {
        console.error("Error connecting to the local database:", error);
      });
  });

mongoose.set("strictPopulate", false);

function addUser(user) {
  const userToAdd = new User(user);
  const promise = userToAdd.save();
  return promise;
}

function getUser(name) {
  let promise;
  if (name) {
    promise = User.find({ username: name });
  } else {
    promise = User.find();
  }
  return promise;
}

function deleteUser(name) {
  return User.findOneAndDelete({ username: name });
}

function addTag(tag) {
  const newTag = new Tag(tag);
  const promise = newTag.save();
  return promise;
}

function getTag(user, tagName) {
  const promise = Tag.find({ username: user, name: tagName });
  return promise;
}

function getTags(user) {
  const promise = Tag.find({ username: user });
  return promise;
}

function deleteTag(tagName) {
  return Tag.findOneAndDelete({ name: tagName });
}

async function getEvent(user, id) {
  let promise;
  if (id) {
    promise = Event.find({ username: user, _id: id }).populate("tags");
  } else {
    promise = Event.find({ username: user }).populate("tags");
  }
  return promise;
}

function getEvents(user) {
  return Event.find({ username: user })
    .sort({
      date: 1,
      startTime: 1,
    })
    .then((events) => {
      const eventsByDay = {};
      events.forEach((event) => {
        const { date } = event;
        if (!eventsByDay[date]) {
          eventsByDay[date] = [];
        }
        eventsByDay[date].push(event);
      });
      return eventsByDay;
    });
}

const addEvent = async (eventData) => {
  // Find tags by name or create them if they don't exist
  const tags = await Promise.all(
    eventData.tags.map(async (tagName) => {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = new Tag({ name: tagName });
        await tag.save();
      }
      return tag;
    }),
  );
  const event = new Event({
    ...eventData,
    tags,
  });

  const promise = event.save();
  return promise;
};

function deleteEvent(id) {
  return Event.findByIdAndDelete(id);
}

function addTask(task) {
  const newTask = new Task(task);
  const promise = newTask.save();
  return promise;
}

function getTasks(user) {
  const promise = Task.find({ username: user });
  return promise;
}

function deleteTask(id) {
  return Task.findByIdAndDelete(id);
}

const updateEvent = async (eventId, updatedEvent) => {
  const promise = await Event.findByIdAndUpdate(eventId, updatedEvent, {
    new: true,
  });
  return promise;
};

export default {
  addUser,
  getUser,
  deleteUser,
  addTag,
  getTag,
  getTags,
  deleteTag,
  addEvent,
  getEvent,
  getEvents,
  deleteEvent,
  addTask,
  getTasks,
  deleteTask,
  updateEvent,
};
