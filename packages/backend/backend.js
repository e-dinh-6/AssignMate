import express from "express";
import cors from "cors";
import services from "./services.js"; //eslint-disable-line
import { registerUser, authenticateUser, loginUser } from "./auth.js"; //eslint-disable-line
// import databaseModel from "./database.js";

const app = express();
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`REST API is listening at ${port}.`);
});

app.use(cors());
app.use(express.json());

app.post("/users", authenticateUser, (req, res) => {
  const newUser = req.body;
  services
    .addUser(newUser)
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(400).send(`Resource not found${error}`));
});

app.get("/users:name", authenticateUser, (req, res) => {
  const { name } = req.params;
  services
    .getUser(name)
    .then((user) => res.send(user))
    .catch((error) => res.status(404).send(`Resource not found.${error}`));
});

app.post("/events", authenticateUser, (req, res) => {
  const event = req.body;
  const { username } = req;
  event.username = username;
  services
    .addEvent(event)
    .then((event) => res.status(201).send(event))
    .catch((error) => res.status(400).send(`error: ${error}`));
});

app.get("/events", authenticateUser, (req, res) => {
  const { username } = req;
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



app.delete("/events/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  services
    .deleteEvent(id)
    .then((index) => res.status(204).send({ index }))
    .catch((error) => res.status(404).send(`Resource not found${error}`));
});

app.post("/tag", authenticateUser, (req, res) => {
  const tag = req.body;
  const { username } = req;
  tag.username = username;
  services
  .getEvents(username)
  .then((events) => res.send(events))
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

app.get("/tag", authenticateUser, (req, res) => {
  const { username } = req;
  services
    .getTags(username)
    .then((events) => res.send(events))
    .catch((error) => res.status(404).send(`Resource not found${error}`));
});

app.post("/tasks", authenticateUser, (req, res) => {
  const task = req.body;
  const { username } = req;
  task.username = username;
  services
    .addTask(task)
    .then((task) => res.status(201).send(task))
    .catch((error) => res.status(404).send(`error: ${error}`));
});

app.get("/tasks", authenticateUser, (req, res) => {
  const { username } = req;
  services
    .getTasks(username)
    .then((tasks) => res.send(tasks))
    .catch((error) => res.status(404).send(`Resource not found ${error}`));
});

app.delete("/tasks/:id", authenticateUser, (req, res) => {
  const { id } = req.params;
  services
    .deleteTask(id)
    .then((index) => res.status(204).send({ index }))
    .catch((error) => res.status(404).send("Resource not found ${error"));
});

app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.post("/signup", registerUser);

app.post("/login", loginUser);
