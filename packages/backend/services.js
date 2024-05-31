// services.js
import mongoose from "mongoose";
import databaseModel from "./database.js";

const { User, Event, Tag } = databaseModel;

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/calendar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getUsers(username) {
  let promise;
  if (username) {
    promise = await findUserByName(username).lean();
  } else {
    promise = await User.find().lean();
  }

  return promise;
}

function getTags(name) {
  let promise;
  if (name) {
    promise = databaseModel.find({ name });
  } else {
    promise = databaseModel.find();
  }
  return promise;
}

function getEvent(title) {
  let promise;
  if (title) {
    promise = Event.find({ title }).lean();
  } else {
    promise = Event.find().lean();
  }
  return promise;
}

function getEvents(userId) {
  const events = Event.find({ user: userId }).sort({ date: 1, startTime: 1 });
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

function findUserByUsernameAndPassword(username, password) {
  return User.find({ username, password });
}

function findUserByName(username) {
  return User.find({ username });
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

export default {
  addUser,
  getUsers,
  getTags,
  findUserByUsernameAndPassword,
  addEvent,
  getEvent,
  getEvents,
  findUserByName,
  deleteEvent,
  addTag,
};
