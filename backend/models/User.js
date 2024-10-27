const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'], // Basic regex for email validation
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'], 
  },
  role: {
    type: String,
    enum: ['user', 'admin'], // Only allow these values
    default: 'user', // Default role is user
  },
  otp: {
    type: String,
    required: false,
},
otpExpiration: {
    type: Date,
    required: false,
},
isOtpVerified: { 
  type: Boolean,
  default: false
},
resetPasswordToken: String,
resetPasswordExpires: Date,
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;
