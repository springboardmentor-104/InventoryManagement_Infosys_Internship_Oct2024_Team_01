const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const categoryController = require('../controllers/categoryController');

// Create a category (admin only)
router.post('/', verifyToken, isAdmin, categoryController.createCategory);

// Get all categories (public access)
router.get('/', categoryController.getCategories);

// Get category by ID (public access)
router.get('/:id', categoryController.getCategoryById);

// Update a category (admin only)
router.put('/:id', verifyToken, isAdmin, categoryController.updateCategory);

// Delete a category (admin only)
router.delete('/:id', verifyToken, isAdmin, categoryController.deleteCategory);

module.exports = router;
