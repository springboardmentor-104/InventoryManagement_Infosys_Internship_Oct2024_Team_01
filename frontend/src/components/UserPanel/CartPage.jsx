import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);  // Initialize with empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token'); // Ensure token is fetched here
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

        if (response.status === 200) {
          // If cart is empty, set it to an empty array
          setCart(response.data.products || []); 
        } else {
          throw new Error('Failed to load cart');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setCart([]); // Ensure cart is empty in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeItemFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to remove items from the cart');
        return;
      }

      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/cart/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Remove item locally from state
        setCart(cart.filter(item => item.productId !== productId));
      } else {
        throw new Error('Failed to remove item');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const total = cart.reduce((sum, item) => {
    const price = item.price || 0;
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
            <div key={item.productId} className="cart-item">
              <div className="item-info">
                <p>{item.name || 'N/A'}</p>
                <p>${item.price !== null && item.price !== undefined ? item.price.toFixed(2) : 'N/A'}</p>
                <p>Quantity: {item.quantity !== null && item.quantity !== undefined ? item.quantity : 'N/A'}</p>
              </div>
              <div className="item-actions">
                <p>Total: ${item.price && item.quantity ? (item.price * item.quantity).toFixed(2) : 'N/A'}</p>
                <button className="remove-btn" onClick={() => removeItemFromCart(item.productId)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>No items in your cart.</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <p><strong>Total: </strong>${total.toFixed(2)}</p>
          <div className="cart-buttons">
             <Link to="/user/place-order"> {/* Add the Link component */}
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