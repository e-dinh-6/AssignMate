import mongoose from "mongoose";
import {User, Event, Category} from "./database.js";

mongoose
  .connect("mongodb://localhost:27017/database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function addUser(user) {
  const userToAdd = new User(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByUsernameAndPassword(username, password) {
  return User.find({username: username, password: password})
}

function addEvent(event) {
  const eventToAdd = new Event(event);
  const promise = eventToAdd.save();
  return promise;
}

function deleteEvent(id) {
  return Event.findByIdAndDelete(id);
}

function addCategory(category) {
  const newTag = new Category(category);
  const promise = newTag.save();
  return promise;
}

export default {
  addUser,
  findUserByUsernameAndPassword,
  addEvent,
  deleteEvent,
  addCategory
};

