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

  mongoose.set('strictPopulate', false);



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
function getTags(id) {
  let promise;
  if (id) {
    promise = Tag.findById(id);
  } else {
    promise = Tag.find();
  }
  return promise;
}}

function getEvent(user, title) {
  let promise;
  if (title) {
    promise = Event.find({ username: user, eventName: title });
  } else {
    promise = Event.find({ username: user });
  }
  return promise;
}

async function getEvents(user) {
  // gets all of a users events sorted by date and time
  const events = await Event.find().sort({
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
  if (!user) {
    return;
  }
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

function findUserByName(name) {
  return User.find({ username: name });
}


 const addEvent = async (eventData) => {
  try {
    // Find tags by name or create them if they don't exist
    const tags = await Promise.all(
      eventData.tags.map(async (tagName) => {
        let tag = await Tag.findOne({ name: tagName });
        if (!tag) {
          tag = new Tag({ name: tagName });
          await tag.save();
        }
        return tag._id;
      })
    );

    const event = new Event({
      ...eventData,
      tags: tags,
    });

    await event.save();
    return event;
  } catch (error) {
    throw new Error(`Error creating event: ${error.message}`);
  }
};

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


const updateEvent = async (eventId, updatedEvent) => {
  try {
    const event = await Event.findByIdAndUpdate(eventId, updatedEvent, { new: true });
    return event;
  } catch (error) {
    throw new Error(`Unable to update event: ${error.message}`);
  }
};

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
  updateEvent,
};
