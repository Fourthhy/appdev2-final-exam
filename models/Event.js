const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: Date
    },
    description: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true} );

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;