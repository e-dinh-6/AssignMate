// services.js
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import databaseModel from "./database.js"; //eslint-disable-line

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

function addUser(user) {
  const userToAdd = new User(user);
  const promise = userToAdd.save();
  return promise;
}

function getUser(name) {
  let promise;
  if (name) {
    promise = User.find({ username: name }).lean();
  } else {
    promise = User.find().lean();
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

// function getTag(user, tagName) {
//   let promise;
//   if (tagName) {
//     promise = Tag.find({ username: user, name: tagName });
//   } else {
//     promise = Tag.find({ username: user });
//   }
//   return promise;
// }
function getTags(user) {
  const promise = Tag.find({ username: user });
  return promise;
}

function deleteTag(tagName) {
  return Tag.findOneAndDelete({ name: tagName });
}

function addEvent(event) {
  const eventToAdd = new Event(event);
  const promise = eventToAdd.save();
  return promise;
}

function getEvent(user, title) {
  let promise;
  if (title) {
    promise = Event.find({ username: user, eventName: title }).lean();
  } else {
    promise = Event.find({ username: user }).lean();
  }
  return promise;
}

async function getEvents(user) {
  // gets all of a users events sorted by date and time
  const events = await Event.find({ username: user }).sort({
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

function deleteEvent(id) {
  return Event.findByIdAndDelete(id);
}

function addTask(task) {
  const newTask = new Task(task);
  const promise = newTask.save();
  return promise;
}

// function getTask(user, taskName) {
//   let promise;
//   if (taskName) {
//     promise = Task.find({ username: user, title: taskName });
//   } else {
//     promise = Task.find({ username: user });
//   }
//   return promise;
// }
function getTasks(user) {
  const promise = Task.find({ username: user });
  return promise;
}

function deleteTask(id) {
  return Task.findByIdAndDelete(id);
}

export default {
  addUser,
  getUser,
  deleteUser,
  addTag,
  getTags,
  deleteTag,
  addEvent,
  getEvent,
  getEvents,
  deleteEvent,
  addTask,
  getTasks,
  deleteTask,
};
