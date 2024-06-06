import express from "express";
import cors from "cors";
import services from "./services.js";
// import databaseModel from "./database.js";

const app = express();
const port = 8000;

app.listen(process.env.PORT || port, () => {
  console.log(`REST API is listening.`);
});

app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {
  const newUser = req.body;
  services
    .addUser(newUser)
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(400).send(`Resource not found${error}`));
});

app.get("/users", (req, res) => {
  const name = req.params;
  services
    .getUsers(name)
    .then((user) => res.send(user))
    .catch((error) => res.status(404).send(`Resource not found.${error}`));
});


app.post("/events", (req, res) => {
  const event = req.body;
  services
    .addEvent(event)
    .then((event) => res.status(201).send(event))
    .catch((error) => res.status(400).send(`error: ${error}`));
});

// app.post("/events/:userId", (req, res) => {
//   const { userId } = req.params;
//   const evented = req.body;
//   services
//     .addEvent(evented)
//     .then((event) => res.status(201).send(event))
//     .catch((error) => res.status(400).send(`error: ${error}`));
// });

app.post("/events", async (req, res) => {
  try {
    const eventData = req.body;
    // Assuming tags are provided as an array of tag IDs or names in the request body
    const event = await Event.create(eventData);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await services.getEvent(); // Call the function to retrieve events
    res.json(events);
  } catch (error) {
    res.status(404).send(`Resource not found: ${error}`);
  }
});

app.get("/events/:id", (req, res) => {
  const {id} = req.params;
  services
    .getEvent(id)
    .then((events) => res.json(events)) // Ensure events are returned as JSON
    .catch((error) => res.status(404).send(`Resource not found: ${error}`));
});


app.put('/events/:id', async (req, res) => {
  try {
    const tagIds = await convertTagNamesToObjectIds(req.body.tags);
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { ...req.body, tags: tagIds }, { new: true });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update event: ' + error.message });
  }
});


app.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  services
    .deleteEvent(id)
    .then((index) => res.status(204).send({ index }))
    .catch((error) => res.status(404).send(`Resource not found${error}`));
});

app.get("/tags", (req, res) => {
  services
    .getTags()
    .then((tags) => res.send(tags))
    .catch((error) => res.status(404).send(`Resource not found: ${error}`));
});

app.get("/tags/:id", (req, res) => {
  const {id} = req.params;
  services
    .getTags(id)
    .then((tags) => res.json(tags)) // Ensure events are returned as JSON
    .catch((error) => res.status(404).send(`Resource not found: ${error}`));
});

app.post("/tags", (req, res) => {
  const tag = req.body;
  services
    .addTag(tag)
    .then((newTag) => res.status(201).send(newTag))
    .catch((error) => res.status(400).send(`Error: ${error}`));
});

app.get("/tasks", (req,res) => {
  const taskName = req.query.taskName;
  services
    .getTask(taskName)
    .then((tasks) => res.send(tasks))
    .catch((error) => res.status(404).send("Resource not found ${error}"));
});

app.post("/tasks", (req,res) => {
  const task = req.body;
  services 
    .addTask(task)
    .then((task) => res.status(201).send(task))
    .catch((error) => res.status(404).send("error: ${error}"));
});

app.delete("/tasks/:id", (req,res) => {
  const {id} = req.params;
  services
    .deleteTask(id)
    .then((index) => res.status(204).send({index}))
    .catch((error) => res.status(404).send("Resource not found ${error"));
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});
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

  mongoose.set('strictPopulate', false);



async function getUsers(username) {
  let promise;
  if (username) {
    promise = await findUserByName(username).lean();
  } else {
    promise = await User.find().lean();
  }
  return promise;
}

function getTags(id) {
  let promise;
  if (id) {
    promise = Tag.findById(id);
  } else {
    promise = Tag.find();
  }
  return promise;
}

async function getEvent(id) {
  let promise;
  if (id) {
    promise = Event.findById(id).populate('tags').lean(); // Fetch a single event by ID
  } else {
    promise = Event.find().populate('tags').lean(); // Fetch all events
  }
  return promise;
}

async function getEvents(userId) {
  const events = await Event.find({ user: userId }).sort({ date: 1, startTime: 1 });
  const eventsByDay = {};
  events.forEach((event) => {
    const { date } = event;
    if (!eventsByDay[date]) {
      eventsByDay[date] = [];
    }
    eventsByDay[date].push(event);
  });
  console.log("Events By Day: ", eventsByDay);
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

const convertTagNamesToObjectIds = async (tags) => {
  const Tag = mongoose.model('Tag');
  const tagIds = await Promise.all(tags.map(async tag => {
    const foundTag = await Tag.findOne({ name: tag.name });
    return foundTag ? foundTag._id : null;
  }));
  return tagIds.filter(tagId => tagId !== null);
};

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
  deleteUser,
  getUsers,
  getTags,
  findUserByUsernameAndPassword,
  addEvent,
  getEvent,
  getEvents,
  findUserByName,
  deleteEvent,
  addTag,
  deleteTag,
  addTask,
  getTask,
  deleteTask,
  updateEvent,
};