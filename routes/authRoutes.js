const express = require('express');
const jwt = require('jwt');
const router = express.Router();
const User = require('../models/Users'); 

const JWT_TOKEN = process.env.JWT_TOKEN

router.post('/signin', async (req, res) => {
    const { email, passowrd } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please enter all fields"});
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials"});
        }

        const token = jwt.sign(
            { id: user_id },
            JWT_TOKEN,
            { expiresIn: '1hr'}
        )

        res.status(200).json({ token })
    } catch (error) {
        console.log("Sign in error", error);
        res.status(500).json({ success: false, message: "Internal serve error" });
    }
});