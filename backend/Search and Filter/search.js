const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Search and filter endpoint
router.get('/search', async (req, res) => {
  try {
    // Extract query parameters
    const { query, category, minPrice, maxPrice, minRating, maxRating } = req.query;

    // Build the search filter
    let filter = {};

    // Text search for item name
    if (query) {
      filter.name = { $regex: query, $options: 'i' }; // Case-insensitive regex search
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Filter by rating range
    if (minRating || maxRating) {
      filter.rating = {};
      if (minRating) filter.rating.$gte = Number(minRating);
      if (maxRating) filter.rating.$lte = Number(maxRating);
    }

    // Query the database
    const items = await Item.find(filter);
    res.json(items);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
