const express = require('express');
const { register, login } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router(); 

// Registration Endpoint
router.post('/register', register);

// Login Endpoint
router.post('/login', login);

// Protected Route
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route!' });
});

module.exports = router;
