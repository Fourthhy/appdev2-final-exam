const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter name"],
    },
    email: {
        type: String,
        required: [true, "please enter email"],
    },
    password: {
        type: String,
        required: [true, "please enter password"]
    }
}, { timestamps: true} );

userSchema.pre('save', async (next)=> {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error)
    }
});

const User = mongoose.model("User", userSchema);
module.exports = User;