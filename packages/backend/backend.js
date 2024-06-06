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

app.post("/events/:userId", (req, res) => {
  const { userId } = req.params;
  const evented = req.body;
  services
    .addEvent(evented)
    .then((event) => res.status(201).send(event))
    .catch((error) => res.status(400).send(`error: ${error}`));
});

app.get("/events", (req, res) => {
  services
    .getEvent()
    .then((events) => res.json(events)) // Ensure events are returned as JSON
    .catch((error) => res.status(404).send(`Resource not found: ${error}`));
});

app.get("/events/:id", (req, res) => {
  const {id} = req.params;
  services
    .getEvent(id)
    .then((events) => res.json(events)) // Ensure events are returned as JSON
    .catch((error) => res.status(404).send(`Resource not found: ${error}`));
});

app.put("/events/:eventId", (req, res) => {
  const { eventId } = req.params;
  const updatedEvent = req.body;
  
  services
    .updateEvent(eventId, updatedEvent)
    .then((event) => res.status(200).send(event))
    .catch((error) => res.status(404).send(`Resource not found: ${error}`));
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
