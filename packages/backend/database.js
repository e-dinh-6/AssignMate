//datbase.js
import mongoose from "mongoose";

// Define Tag Schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    { collection : "users_list" });

const User = mongoose.model("User", userSchema);

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        color: {
            type: String,
            default: "#808080" // default color is gray
        }
    },
    { collection : "tags_list" });

const Tag = mongoose.model("Tag", tagSchema);

// Define Event Schema
const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        tag: [tagSchema],
        description: {
            type: String,
            required: false
        }
    },
    { collection: "events_list"}
);

const Event = mongoose.model("Event" , eventSchema);

export default {User, Event, Tag};