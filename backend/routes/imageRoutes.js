const express = require('express');
const upload = require('../config/multerConfig');
const Product = require('../models/Product');
const router = express.Router();

// POST /api/products/:productId/images - Upload images for a product
router.post('/:productId/images', upload.array('images', 5), async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Save image file paths in the product's images array
    const filePaths = req.files.map(file => file.path);
    product.images.push(...filePaths);
    await product.save();

    res.status(200).json({ message: 'Images uploaded successfully', images: product.images });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
