//backend.js
import express from "express";
import cors from "cors";
import services from "./services.js";

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());

app.post("/users", (req,res) => {
  const newUser = req.body;
  services.addUser(newUser)
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send());
});

app.get("/users/:username/:password", (req, res) => {
  const {username, password} = req.params;
  services.findUserByUsernameAndPassword(username,password)
    .then(user => res.send(user))
    .catch(error => resizeTo.status(404).send("Resource not found."));
});

app.post("/events", (req, res) => {
  const event = req.body;
  services.addEvent(event)
    .then(event => res.status(201).send(event))
    .catch(error => res.status(400).send());
});

app.delete("/events/:id", (req,res) => {
  const id = req.params.id;
  services.deleteEvent(id)
    .then(index => res.status(204).send({index}))
    .catch(error > res.status(404).send("Resource not found."));
});

app.post("/category", (req, res) => {
  const category = req.body;
  services.addCategory(category)
    .then(category => res.status(201).send(category))
    .catch(error => res.status(400).send());
});

app.listen(port, () => {
    console.log(
      `Example app listening at http://localhost:${port}`
    );
  });