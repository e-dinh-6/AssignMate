// services.js
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import databaseModel from "./database.js";

const { User, Event, Tag } = databaseModel;

mongoose.set("debug", true);
dotenv.config();
const { MONGODB_URL } = process.env;

mongoose
  .connect(MONGODB_URL, {
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

function getTags(tagName) {
  let promise;
  if (tagName) {
    promise = Tag.find({ name: tagName });
  } else {
    promise = databaseModel.find();
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

function findUserByUsernameAndPassword(name, pw) {
  return User.find({ username: name, password: pw });
}

function findUserByName(name) {
  return User.find({ userame: name });
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
  addEvent,
  deleteEvent,
  addTag,
};
