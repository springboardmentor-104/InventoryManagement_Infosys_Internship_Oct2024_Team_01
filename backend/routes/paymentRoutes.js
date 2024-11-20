const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/paymentController');
const router = express.Router();

// Create Order
router.post('/create-order', createOrder);

// Verify Payment
router.post('/verify-payment', verifyPayment);

module.exports = router;
