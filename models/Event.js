const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    location: {
        type: String,
    },
    date: {
        type: Date,
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;