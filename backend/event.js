import mongoose from "mongoose";

// Define Tag Schema
const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        color: {
            type: String,
            default: '#808080' // default oclor is gray
        }
    });

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

const Event = mongoose.model('Event' , eventSchema);

export default Event;