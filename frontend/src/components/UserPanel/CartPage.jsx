import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/imageUtil';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    setLoading(true);
    try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view your cart');
          setLoading(false);
          return;
        }

      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data?.products) {
        setCart(response.data.products);
      } else {
        setCart([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItemFromCart = async (productId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/cart/${productId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 200) {
        setCart(cart.filter(item => item.productId._id !== productId));

        fetchCart();
      } else {
        throw new Error('Failed to remove item');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const total = cart.reduce((sum, item) => {
    const price = item.productId.price || 0;
    const quantity = item.quantity || 0;
    return sum + (price * quantity);
  }, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.productId._id} className="cart-item">
              <div className="item-image">
                {item.productId.images && item.productId.images.length > 0 ? (
                  <img
                    src={getImageUrl(item.productId.images[0])}
                    alt={item.productId.name || 'Product'}
                  />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <div className="item-info">
                <p>{item.productId.name || 'N/A'}</p>
                <p>Rs.{item.productId.price !== null ? item.productId.price.toFixed(2) : 'N/A'}</p>
                <p>Quantity: {item.quantity !== null ? item.quantity : 'N/A'}</p>
              </div>
              <div className="item-actions">
                <p>Total: Rs.{item.productId.price && item.quantity ? (item.productId.price * item.quantity).toFixed(2) : 'N/A'}</p>
                <button className="remove-btn" onClick={() => removeItemFromCart(item.productId._id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>No items in your cart.</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <p><strong>Total: </strong>Rs.{total.toFixed(2)}</p>
          <div className="cart-buttons">
             <Link to="/user/billing-details"> {/* Add the Link component */}
              <button className="checkout-btn">Proceed to Checkout</button>
            </Link>
            <button className="continue-btn">Continue Shopping</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
