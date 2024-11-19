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
  const [cartMessage, setCartMessage] = useState(''); // To show cart message
  const [loadingCart, setLoadingCart] = useState(false); // To disable button while loading

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log('Product data:', response.data);

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

  const handleAddToCart = async () => {
    setLoadingCart(true);
    const token = localStorage.getItem('token'); // Ensure token is available for cart request

    if (!token) {
      setCartMessage('You need to log in to add items to the cart.');
      setLoadingCart(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity: 1, // You can modify this if you want users to select quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCartMessage('Product added to cart successfully!');
      }
    } catch (error) {
      setCartMessage('Error adding product to cart.');
    } finally {
      setLoadingCart(false);

      // Clear the message after 3 seconds
      setTimeout(() => setCartMessage(''), 3000);
    }
  };

  const handleViewCart = () => {
    navigate('/user/cart'); // Navigate to the cart page
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
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to products
      </button>
      <div className="product-header">
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${product.images?.[0] || 'placeholder.jpg'}`}
          alt={product.name || 'Product Image'}
          className="product-image"
        />
        <div className="product-info">
          <p className="product-name">{product.name}</p>
          <p className="product-price">Rs. {product.price?.toFixed(2) || 'N/A'}</p>
          <p className="product-category">Category: {product.category?.name || 'Uncategorized'}</p>
          <p className="product-description">
            {product.description || 'No description available.'}
          </p>
          <div className="button-group">
            <button
              className="btn add-to-cart"
              onClick={handleAddToCart}
              disabled={loadingCart} // Disable button while loading
            >
              {loadingCart ? 'Adding...' : 'Add to Cart'}
            </button>
            <button className="btn view-cart" onClick={handleViewCart}>
              View Cart
            </button>
          </div>
          {cartMessage && <p className="cart-message">{cartMessage}</p>} {/* Show feedback message */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
