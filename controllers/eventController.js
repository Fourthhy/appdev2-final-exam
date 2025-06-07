const Event = require('../models/Event'); 
const Email = require('../config/nodemailer');
const User = require('../models/User');

exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('userId', 'name email');
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching all events:', error);
        res.status(500).json({ message: 'Server error fetching events.' });
    }
};

exports.createEvent = async (req, res) => {
    const { title, location, date, description } = req.body;
    const userId = req.userId; 

    if (!title || !location || !date || !description) {
        return res.status(400).json({ message: 'Please enter all event fields.' });
    }

    try {
        const newEvent = new Event({
            title,
            location,
            date,
            description,
            userId,
        });

        const savedEvent = await newEvent.save();
        const populatedEvent = await Event.findById(savedEvent._id).populate('userId', 'name email');
        const user = await User.findById(userId);
        if (user) {
            try {
                await new Email(user, populatedEvent).sendEventConfirmation();
                console.log(`Confirmation email sent to ${user.email} for event: ${populatedEvent.title}`);
            } catch (error) {
                console.error('Failed to send confirmation email:', error);
            }
        } else {
            console.warn(`User with ID ${userId} not found for email confirmation.`);
        }

        res.status(201).json(populatedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal Server Error: creating events' });
    }
};

exports.getMyEvents = async (req, res) => {
    const userId = req.userId;
    try {
        const myEvents = await Event.find({ userId }).populate('userId', 'name email');
        res.status(200).json(myEvents);
    } catch (error) {
        console.error('Error fetching user-specific events:', error);
        res.status(500).json({ message: 'Server error fetching my events.' });
    }
};