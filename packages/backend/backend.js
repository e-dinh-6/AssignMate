// backend.js
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

app.put("/events/:eventId", async (req, res) => {
  const { eventId } = req.params;
  const updatedEvent = req.body;

  try {
    const event = await services.updateEvent(eventId, updatedEvent);
    if (event) {
      res.status(200).send(event);
    } else {
      res.status(404).send("Resource not found");
    }
  } catch (error) {
    res.status(500).send(`Internal server error: ${error}`);
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
