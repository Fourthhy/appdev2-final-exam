const express = require('express');
const router = express.Router();
const User = require('../models/Users'); 


router.post('/signin', async (req, res) => {
    const { name, passowrd } = req.body;

    const user = await User.findOne({

    })
});