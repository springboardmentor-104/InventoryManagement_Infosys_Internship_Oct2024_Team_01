import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CartPage.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Check if the cart contains products and set the state
        if (response.data?.products) {
          setCart(response.data.products); // Use products directly
        } else {
          setCart([]); // Fallback if there are no products
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setCart([]); // Fallback to empty array if error occurs
      } finally {
        setLoading(false);
      }
    };

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
        // Remove item from the cart UI based on productId
        setCart(cart.filter(item => item.productId !== productId));
      } else {
        throw new Error('Failed to remove item');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Calculate the total cost of all items in the cart
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
            <button className="checkout-btn">Proceed to Checkout</button>
            <button className="continue-btn">Continue Shopping</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
