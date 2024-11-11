const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); 

router.get('/salesData', adminController.getSalesData);
router.get('/categories', adminController.getCategories);
router.get('/outOfStockItems', adminController.getOutOfStockItems);
router.get('/totalProducts', adminController.getTotalProducts);
router.get('/salesOverTime', adminController.getSalesOverTime);
router.get('/inventoryByCategory', adminController.getInventoryByCategory);


// Admin Dashboard Endpoint
router.post('/admin/dashboard', adminController.dashboard);
module.exports = router;
