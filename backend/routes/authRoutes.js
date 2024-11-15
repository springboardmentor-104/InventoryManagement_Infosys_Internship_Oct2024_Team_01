// routes/authRoutes.js
const express = require('express');
const { logoutUser } = require('../controllers/authController');

const router = express.Router();

// POST request for logging out
router.post('/logout', logoutUser);

module.exports = router;
