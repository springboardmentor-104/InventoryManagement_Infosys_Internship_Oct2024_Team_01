import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Product.css';

const Product = ({ product, setCartMessage }) => {
  const getImageUrl = (imagePath) => {
    return `http://localhost:4000/${imagePath}`;
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart`,
        { productId: product._id, quantity: 1 },  // Send product ID and quantity
        {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }
      );
      
      if (response.status === 200) {
        setCartMessage('Product successfully added to cart!');
      }
    } catch (err) {
      console.error(err);
      setCartMessage('Error adding product to cart. Please try again.');
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-image">
        {product.images && product.images.length > 0 ? (
          <img src={getImageUrl(product.images[0])} alt={product.name} />
        ) : (
          <span>No Image</span>
        )}
      </Link>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stockQuantity}</p>
        <p>Category: {product.category?.name || 'Uncategorized'}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default Product;
