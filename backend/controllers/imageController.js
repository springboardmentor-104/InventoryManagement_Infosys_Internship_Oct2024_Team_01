const fs = require('fs');
const path = require('path');

// Upload Image
exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(201).json({ imageUrl: `/uploads/images/${req.file.filename}` });
};

// Delete Image
exports.deleteImage = (req, res) => {
  const imagePath = path.join(__dirname, '../uploads/images', req.params.filename);
  fs.unlink(imagePath, (err) => {
    if (err) return res.status(404).json({ message: 'Image not found' });
    res.status(200).json({ message: 'Image deleted successfully' });
  });
};

// Get Image
exports.getImage = (req, res) => {
  const imagePath = path.join(__dirname, '../uploads/images', req.params.filename);
  res.sendFile(imagePath);
};