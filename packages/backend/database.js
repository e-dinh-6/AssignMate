// datbase.js
import mongoose from "mongoose";

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
    username: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#808080", // default colour is grey
    },
  },
  { collection: "tags_list" },
);

const Tag = mongoose.model("Tag", tagSchema);

// Define Event Schema
const eventSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    eventName: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
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
    description: {
      type: String,
      required: false,
    },
  },
  { collection: "events_list" },
);

const Event = mongoose.model("Event", eventSchema);

// const calendarSchema = new mongoose.Schema({
//   color: {
//     type: String,
//     default: "#000000",
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   events: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Event",
//   },
//   view: {
//     type: String,
//     enum: ["list", "week", "month"],
//     default: "month",
//   },
// });

// const Calendar = mongoose.model("Calendar", calendarSchema);

const taskSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { collection: "tasks_list" },
);

const Task = mongoose.model("Task", taskSchema);

// export default { User, Event, Tag, Calendar, Task };
export default { User, Event, Tag, Task };
