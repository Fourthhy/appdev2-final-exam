const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_TOKEN = process.env.JWT_TOKEN

const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please enter all fields" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { id: user._id },
            JWT_TOKEN,
            { expiresIn: '600' }
        )

        res.status(200).json({ token })
    } catch (error) {
        console.log("Sign in error", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { signin };