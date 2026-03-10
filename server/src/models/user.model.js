const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isVerified: {
        type: Boolean,
        default: false
    },
 
})

const userModel = mongoose.model("user", userSchema)
module.exports = userModel;
