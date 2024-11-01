const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin, isUser } = require('../middlewares/authMiddleware');

// Public route: Get all products (accessible to both roles)
router.get('/', verifyToken, productController.getProducts);
router.get('/category/:categoryId', productController.getProductsByCategory);

// Admin routes
router.post('/', verifyToken, isAdmin, productController.addProduct);
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

// User route
router.get('/:id', verifyToken, isUser, productController.viewProduct);
router.post('/:id/buy', verifyToken, isUser, productController.buyProduct);

module.exports = router;