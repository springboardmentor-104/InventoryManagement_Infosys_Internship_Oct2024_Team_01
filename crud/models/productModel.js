const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  sku:{type:String},
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  views:{type:Number},
  status: { type: String, default: 'Active' },
});

module.exports = mongoose.model('Product', productSchema);
