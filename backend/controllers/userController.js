const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/user'); 
const { createToken } = require('../utils/jwt');
const { sendEmail }= require('../config/mailer');
const { generateResetToken } = require('../utils/passwordReset');


// Registration Logic
exports.register = async (req, res) => {
    const { name, email, password, role = 'user'} = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    const otpExpiration = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiration,
            role,
        });

        await user.save();

        // Send OTP email
        await sendEmail({
            to: user.email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
        });
        
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

        if (!user.isOtpVerified) return res.status(403).json({ message: 'Please verify your OTP before logging in.' });

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
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if( user.isOtpVerified == true) {
            return res.status(403).json({ message: 'OTP Already verified.' });
        }

        if (user.otp !== otp || user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        if (user.otp === otp && user.otpExpiration > Date.now()) {
            user.isOtpVerified = true;
            user.otp = undefined;
            user.otpExpiration = undefined;
            await user.save();
            return res.status(200).json({ message: 'OTP verified successfully.' });
        } else {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// ForgetPassword Logic
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        // Generate a password reset token
        const { resetToken, resetExpires } = generateResetToken();

        // Set token and expiration time in the user-schema
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetExpires;
        await user.save();

        console.log('User after saving reset token:', user);

        //Send Reset email 
        const resetUrl = `http://${req.headers.host}/reset/${resetToken}`;
        await sendEmail({
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Please use the following token to reset your password: ${resetToken}. Alternatively, click the link below to reset your password:\n\n${resetUrl}`,
            html: `<p>You requested a password reset. Please use the following token to reset your password: ${resetToken}. Alternatively, click the link below to reset your password: <a href="${resetUrl}">Reset Password</a></p>`,
        });

        res.status(200).json({ message: "Password reset email sent!" });
    } catch (error) {
        console.error("Error in forgot password process", error);
        res.status(500).json({ error: "Error in forgot password process" });
    }
};

//Resetting the Password
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).send('Password is required');
        }

        // Find the user by token and check if the token is valid
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).send('Invalid or expired token');
        }

        // Hash the new password before saving it
        user.password = await bcrypt.hash(password, 10); 
        user.resetPasswordToken = undefined; // Clear the reset token and expiration
        user.resetPasswordExpires = undefined; 
        await user.save();

        res.status(200).send('Password has been reset successfully');
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).send('Error resetting password');
    }
};


// Resend OTP Logic
exports.resendOtp = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.isOtpVerified) {
            return res.status(400).json({ message: 'OTP already verified.' });
        }

        const generateAndSendOtp = async (user) => {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes
        
            user.otp = otp;
            user.otpExpiration = otpExpiration;
            await user.save();
        
            await sendEmail({
                to: user.email,
                subject: 'Your OTP Code',
                text: `Your OTP code is: ${otp}`,
            });
        };
        
        await generateAndSendOtp(user);

        res.status(200).json({ message: 'New OTP sent to your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error resending OTP.' });
    }
};

