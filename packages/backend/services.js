// services.js
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import databaseModel from "./database.js";

const { User, Event, Tag, Task } = databaseModel;

mongoose.set("debug", true);
dotenv.config();
const { MONGODB_URL } = process.env;

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
    console.log("Attempting to connect to the local database...");
    mongoose
      .connect("mongodb://localhost:27017/asignmate", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((error) => {
        console.error("Error connecting to the local database:", error);
      });
  });

async function getUser(name) {
  let promise;
  if (name) {
    promise = await User.find({ username: name }).lean();
  } else {
    promise = await User.find().lean();
  }
  return promise;
}

function getTags(tagName) {
  let promise;
  if (tagName) {
    promise = Tag.find({ name: tagName });
  } else {
    promise = Tag.find();
  }
  return promise;
}

function getEvent(title) {
  let promise;
  if (title) {
    promise = Event.find({ eventName: title }).lean();
  } else {
    promise = Event.find().lean();
  }
  return promise;
}

async function getEvents(userId) {
  const events = await Event.find({ user: userId }).sort({
    date: 1,
    startTime: 1,
  });
  const eventsByDay = {};
  events.forEach((event) => {
    const { date } = event;
    if (!eventsByDay[date]) {
      eventsByDay[date] = [];
    }
    eventsByDay[date].push(event);
  });
  return eventsByDay;
}

function addUser(user) {
  const userToAdd = new User(user);
  const promise = userToAdd.save();
  return promise;
}

function deleteUser(name) {
  return User.findOneAndDelete({ username: name });
}

function findUserByUsernameAndPassword(name, pw) {
  return User.find({ username: name, password: pw });
}

function addEvent(event) {
  const eventToAdd = new Event(event);
  const promise = eventToAdd.save();
  return promise;
}

function deleteEvent(id) {
  return Event.findByIdAndDelete(id);
}

function addTag(tag) {
  const newTag = new Tag(tag);
  const promise = newTag.save();
  return promise;
}

function deleteTag(tagName) {
  return Tag.findOneAndDelete({ name: tagName });
}

function addTask(task) {
  const newTask = new Task(task);
  const promise = newTask.save();
  return promise;
}

function getTask(taskName) {
  let promise;
  if (taskName) {
    promise = Task.find({ title: taskName });
  } else {
    promise = Task.find();
  }
  return promise;
}

function deleteTask(id) {
  return Task.findByIdAndDelete(id);
}

export default {
  addUser,
  deleteUser,
  getUser,
  getTags,
  findUserByUsernameAndPassword,
  addEvent,
  getEvent,
  getEvents,
  deleteEvent,
  addTag,
  deleteTag,
  addTask,
  getTask,
  deleteTask,
};
