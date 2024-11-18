import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch product details');
        }

        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    // Logic for adding product to cart
    alert(`${product.name} added to cart!`);
  };

  const handleViewCart = () => {
    // Navigate to cart page
    navigate('/cart');
  };

  if (loading) {
    return <div className="loading">Loading product details...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (!product) {
    return <div className="error-message">Product not found.</div>;
  }

  return (
    <div className="product-details-page">
      <button className="back-button" onClick={() => navigate(-1)}>← Back to products</button>
      <div className="product-header">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${product.images?.[0] || 'placeholder.jpg'}`}
          alt={product.name || 'Product Image'}
          className="product-image"
        />
        <div className="product-info">
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price?.toFixed(2) || 'N/A'}</p>
          <p className="product-description">{product.description || 'No description available.'}</p>
          <div className="button-group">
            <button className="btn add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
            <button className="btn view-cart" onClick={handleViewCart}>View Cart</button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetails;
