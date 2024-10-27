const express = require('express');
const { register, login, verifyOtp, resendOtp, forgotPassword, resetPassword} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateOtpInput = require('../middlewares/validateOtp');

const router = express.Router(); 

// Registration Endpoint
router.post('/register', register);

// Login Endpoint
router.post('/login', login);

// Protected Route
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route!' });
});

// OTP verification route
router.post('/verify-otp', validateOtpInput, verifyOtp);
router.post('/resend-otp', resendOtp);

// ForgetPassword route
router.post('/forgot-password', forgotPassword);  // Request password reset
router.post('/reset-password/:token', resetPassword);  // Reset password


module.exports = router;
