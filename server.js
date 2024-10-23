

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); 
const crypto = require('crypto');

// Import the User model
const User = require('./models/User');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host : 'smtp.gmail.com',
    secure :false,
    service: 'gmail',
    auth: {
        user:  process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
    }
});

// Generate OTP
function generateOTP() {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
}

// Send OTP to Email
function sendOTP(email, otp) {
    const mailOptions = {
        from: process.env.EMAIL_USER,  
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    return transporter.sendMail(mailOptions);
}


// Register & Send OTP
app.post('/register', async (req, res) => {
    const { email } = req.body;

    console.log('Incoming email:', email); 

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        console.log('User lookup result:', user); 

        if (user) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate OTP
        const otp = generateOTP();
        const otpExpires = Date.now() + 10 * 60 * 1000;  // OTP valid for 10 minutes
        console.log('Generated OTP:', otp);

        // Save user with OTP in the database
        user = new User({ email, otp, otpExpires });
        await user.save();

        // Send OTP via email
        await sendOTP(email, otp);

        res.status(200).json({ message: 'OTP sent to your email' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Verify OTP and only store user if OTP is correct
app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if OTP is correct and not expired
        if (user.otp === otp && user.otpExpires > Date.now()) {
            // Save user to the database after successful OTP verification
            // You may want to clear the OTP from the database after successful verification
            await User.updateOne({ email }, { $unset: { otp: "", otpExpires: "" } }); // Remove OTP and expiration from the user

            res.status(200).json({ message: 'OTP verified successfully and user saved' });
        } else {
            res.status(400).json({ message: 'Invalid or expired OTP' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send("hello vivek bro");
});
