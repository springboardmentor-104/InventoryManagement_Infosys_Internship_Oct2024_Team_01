const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpires: { type: Date }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
