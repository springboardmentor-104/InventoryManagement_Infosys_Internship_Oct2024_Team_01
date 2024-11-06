import React, { useState, useEffect } from 'react';
import './CartPage.css'; // Import your CSS file

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart'); // Adjust the endpoint
        if (!response.ok) throw new Error('Failed to fetch cart data');

        const data = await response.json();
        setCart(data); // Set the full cart data if backend is connected
      } catch (err) {
        setError(err.message);
        // If there's an error, show only one item as a fallback
        setCart([{ id: 1, name: 'Sample Item', price: 0, quantity: 1 }]);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <p>{item.name || 'N/A'}</p>
              <p>${item.price !== null ? item.price.toFixed(2) : 'N/A'}</p>
              <p>Quantity: {item.quantity !== null ? item.quantity : 'N/A'}</p>
            </div>
            <div className="item-actions">
              <p>Total: ${item.price && item.quantity ? (item.price * item.quantity).toFixed(2) : 'N/A'}</p>
              <button className="remove-btn">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <p><strong>Total: </strong>${total.toFixed(2) || 'N/A'}</p>
        <div className="cart-buttons">
          <button className="checkout-btn">Proceed to Checkout</button>
          <button className="continue-btn">Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
