const express = require('express');
const { verifyToken, isUser } = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.post('/', verifyToken, isUser, cartController.addToCart);
router.get('/', verifyToken, isUser, cartController.getCart);
router.put('/:productId', verifyToken, isUser, cartController.updateCartItem);
router.delete('/:productId', verifyToken, isUser, cartController.removeFromCart);

module.exports = router;
