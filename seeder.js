const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/Users'); 
const Event = require('../models/Event'); 

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error(err));

const seedData = async () => {
    try {

    } catch (error) {
        
    }
};

