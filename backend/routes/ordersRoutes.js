// routes/ordersRoutes.js

const express = require('express');
const { getOrders } = require('../controllers/ordersController');

const router = express.Router();

router.get('/orders', getOrders);

module.exports = router;
