// datbase.js
import mongoose from "mongoose";
import * as dotenv from "dotenv";

const client = new MongoClient(dotenv, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Define Tag Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "users_list" },
);

const User = mongoose.model("User", userSchema);

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      default: "#808080", // default color is gray
    },
  },
  { collection: "tags_list" },
);

const Tag = mongoose.model("Tag", tagSchema);

// Define Event Schema
const eventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    eventName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
    status: {
      type: String,
      required: true,
    },
    tag: [tagSchema],
    description: {
      type: String,
      required: false,
    },
  },
  { collection: "events_list" },
);

const Event = mongoose.model("Event", eventSchema);

const calendarSchema = new mongoose.Schema({
  color: {
    type: String,
    default: "#000000",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  events: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  view: {
    type: String,
    enum: ["list", "week", "month"],
    default: "month",
  },
});

const Calendar = mongoose.model("Calendar", calendarSchema);

export default { User, Event, Tag, Calendar };
