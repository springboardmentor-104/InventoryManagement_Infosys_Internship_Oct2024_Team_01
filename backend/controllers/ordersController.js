// controllers/ordersController.js

const orders = require('../models/ordersModel');

const getOrders = (req, res) => {
  res.json(orders);
};

module.exports = { getOrders };
