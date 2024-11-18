import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [cartMessage, setCartMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const getImageUrl = (imagePath) => {
    return `${process.env.REACT_APP_BACKEND_URL}/${imagePath}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch products');
        }

        setProducts(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to load products');
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    setLoading(true);
    const quantity = 1;
    const token = localStorage.getItem('token'); // Ensure token is available for cart request

    if (!token) {
      setCartMessage('You need to log in to add items to the cart.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/cart`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setCartMessage('Product added to cart successfully!');
      }
    } catch (error) {
      setCartMessage('Error adding product to cart.');
    } finally {
      setLoading(false);

      // Clear the message after 3 seconds
      setTimeout(() => setCartMessage(''), 3000);
    }
  };

  return (
    <div className="products-container">
      <h2>Products</h2>
      {cartMessage && <p className="cart-message">{cartMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <Link 
              to={`/user/products/${product._id}`} 
              className="product-link"
            >
              {product.images && product.images.length > 0 ? (
                <img 
                  src={getImageUrl(product.images[0])} 
                  alt={product.name || 'Product'} 
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
              <h4>{product.name || 'N/A'}</h4>
              <p>${product.price !== null ? product.price.toFixed(2) : 'N/A'}</p>
            </Link>
            <button 
              className="add-to-cart-button" 
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation on click
                addToCart(product._id);
              }}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;