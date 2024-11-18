const express = require('express');
const { register, login, logout, verifyOtp, resendOtp, forgotPassword, resetPassword} = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const validateOtpInput = require('../middlewares/validateOtp');
// const dashboardController = require('../controllers/dashboardController');

const router = express.Router(); 

// Registration Endpoint
router.post('/register', register);

// Login Endpoint
router.post('/login', login);

// Logout route
router.post('/logout', verifyToken, logout);

// OTP verification route
router.post('/verify-otp', validateOtpInput, verifyOtp);
router.post('/resend-otp', resendOtp);

// ForgetPassword route
router.post('/forgot-password', forgotPassword);  // Request password reset
router.post('/reset-password/:token', resetPassword);  // Set new password

// General Protected route - for authenticated users
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Welcome to the protected route!',
    userId: req.userId,
    role: req.userRole,
  });
});
  
// Admin-Only Protected route
router.get('/admin/protected', verifyToken, isAdmin, (req, res) => {
  res.status(200).json({
    message: 'Welcome to the admin-only route!',
    adminId: req.userId,
  });
});

// Dashboard route
// router.get('/dashboard', verifyToken, dashboardController);


module.exports = router;
