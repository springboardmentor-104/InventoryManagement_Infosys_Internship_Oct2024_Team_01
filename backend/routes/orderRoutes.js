const express = require('express');
const { verifyToken, isUser } = require('../middlewares/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.post('/place-order', verifyToken, isUser, orderController.placeOrder);
router.get('/', verifyToken, isUser, orderController.getUserOrders);
router.get('/:orderId', verifyToken, isUser, orderController.getUserOrders);

module.exports = router;
