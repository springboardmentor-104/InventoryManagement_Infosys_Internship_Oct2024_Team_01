const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  rating: Number,
});

module.exports = mongoose.model('Item', itemSchema);
