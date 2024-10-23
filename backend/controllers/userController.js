const User = require('../models/user'); 
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/jwt');
const sendEmail = require('../config/mailer');

// Registration Logic
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    const otpExpiration = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiration,
        });

        await user.save();

        // Send OTP email
        await sendEmail(email, 'Your OTP Code', `Your OTP code is: ${otp}`);

        res.status(201).json({ message: 'User registered. Check your email for the OTP.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user.' });
    }
};

// Login Logic
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // (implementing JWT)
        const token = createToken(user._id);

        res.status(200).json({ token }); // token in response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// OTP Verification Logic
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if OTP matches and is not expired
        if (user.otp === otp && user.otpExpiration > Date.now()) {
            // OTP is valid; you can proceed with registration or other actions
            return res.status(200).json({ message: 'OTP verified successfully.' });
        } else {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
