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
    name: {
      type: String,
      required: true,
      unique: true,
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
