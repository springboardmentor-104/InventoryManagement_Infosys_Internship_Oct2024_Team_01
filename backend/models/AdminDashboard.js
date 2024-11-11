const mongoose = require('mongoose');

const salesOverTimeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  sales: { type: Number, required: true },
});

const inventoryByCategorySchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  totalStock: { type: Number, required: true },
});

const adminDashboardSchema = new mongoose.Schema({
  totalSales: { type: Number, default: 0 },
  totalCategories: { type: Number, default: 0 },
  outOfStockItems: { type: Number, default: 0 },
  totalProducts: { type: Number, default: 0 },
  salesOverTime: [salesOverTimeSchema],
  inventoryByCategory: [inventoryByCategorySchema], 
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminDashboard', adminDashboardSchema);
