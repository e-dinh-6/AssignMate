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

// app.get("/users/:username/:password", (req, res) => {
//   const {username, password} = req.params;
//   services.findUserByUsernameAndPassword(username,password)
//     .then(user => res.send(user))
//     .catch(error => resizeTo.status(404).send("Resource not found."));
// });

app.get("/users", (req, res) => {
  const name = req.params;
  services
    .getUsers(name)
    .then((user) => res.send(user))
    .catch((error) => res.status(404).send(`Resource not found.${error}`));
});

// app.get("/events", (req, res) => {
//   const { title, date, tag, description } = req.query;
//   services
//     .getEvent(title)
//     .then((event) => res.send(event))
//     .catch((error) => res.status(404).send(`Resource not found${error}`));
// });

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
  const { userId } = req.params;
  services
    .getEvents(userId)
    .then((events) => res.send(events))
    .catch((error) => res.status(404).send(`Resource not found${error}`));
});

app.delete("/events/:id", (req, res) => {
  const { id } = req.params;
  services
    .deleteEvent(id)
    .then((index) => res.status(204).send({ index }))
    .catch((error) => res.status(404).send(`Resource not found${error}`));
});

app.post("/tag", (req, res) => {
  const tag = req.params;
  services
    .addTag(tag)
    .then((tag) => res.status(201).send(tag))
    .catch((error) => res.status(400).send(`error: ${error}`));
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
