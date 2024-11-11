// adminController.js

const AdminDashboard = require('../models/AdminDashboard');
const Product = require('../models/Product');
const Category = require('../models/category');

exports.dashboard = async (req, res) => {
    try {
      // Logic for the dashboard data (e.g., fetching stats or reports)
      const data = {
        message: "Welcome to the Admin Dashboard",
      };
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to load dashboard data', error });
    }
  };
// Get total sales data
exports.getSalesData = async (req, res) => {
  try {
    const totalSales = await Product.aggregate([
      { $group: { _id: null, total: { $sum: '$price' } } },
    ]).then(result => (result[0] ? result[0].total : 0));
    res.status(200).json({ totalSales });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve sales data', error });
  }
};

// Get total categories count
exports.getCategories = async (req, res) => {
  try {
    const totalCategories = await Category.countDocuments();
    res.status(200).json({ totalCategories });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve categories', error });
  }
};

// Get count of out-of-stock items
exports.getOutOfStockItems = async (req, res) => {
  try {
    const outOfStockItems = await Product.countDocuments({ stockQuantity: { $lte: 0 } });
    res.status(200).json({ outOfStockItems });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve out-of-stock items', error });
  }
};

// Get total products count
exports.getTotalProducts = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.status(200).json({ totalProducts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve total products', error });
  }
};

// Get sales over time data
exports.getSalesOverTime = async (req, res) => {
  try {
    const dashboardData = await AdminDashboard.findOne();
    res.status(200).json(dashboardData ? dashboardData.salesOverTime : []);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve sales over time data', error });
  }
};

// Get inventory by category
exports.getInventoryByCategory = async (req, res) => {
  try {
    const inventoryByCategory = await Product.aggregate([
      { $group: { _id: '$category', totalStock: { $sum: '$stockQuantity' } } },
    ]);
    res.status(200).json(inventoryByCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve inventory by category', error });
  }
};
