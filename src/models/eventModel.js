import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rsvp: {
        type: Array,
        default: []
    },
    createdBy: {
        type: String,
        default: "Someone"
    }
});

export const Event = mongoose.model('Event', EventSchema);