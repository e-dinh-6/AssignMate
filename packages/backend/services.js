//services.js
import mongoose from "mongoose";
import databaseModel from "./database.js";

const {User, Event, Tag} = databaseModel;

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/calendar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name) {
  let promise;
  if (name) {
    promise = findUserByName(name).lean();
  } else {
    promise = User.find().lean();
  }

  return promise;
}

function getTags(name) {
  let promise;
  if (name) {
    promise = databaseModel.find({name: name});
  } else {
      promise = databaseModel.find();
  }
  return promise;
}

function getEvents(title) {
  let promise;
  if (title) {
    promise = Event.find({title: title}).lean();
  } else {
    promise = Event.find().lean();
  }
  return promise;
}


function addUser(user) {
  const userToAdd = new User(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByUsernameAndPassword(username, password) {
  return User.find({username: username, password: password})
}

function findUserByName(name) {
  return User.find({name: name})
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
  getEvents,
  deleteEvent,
  addTag
};

