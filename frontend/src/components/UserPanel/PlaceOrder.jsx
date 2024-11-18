import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch cart data from the backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to view your cart');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setCart(response.data.products || []); // Populate cart with real-time data
        } else {
          throw new Error('Failed to load cart');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const price = item.productId?.price || 0;
    const quantity = item.quantity || 0;
    return total + price * quantity;
  }, 0);

  // Handle "Proceed to Payment" click
  const handleProceedToPayment = () => {
    navigate('/user/payment');
  };

  return (
    <div className="place-order-page">
      <h2>Order Summary</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && cart.length > 0 && (
        <>
          <div className="order-details">
            <h3>Products</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.productId._id}>
                  <span>{item.productId.name}</span>
                  <span>
                    ({item.quantity} x ${item.productId.price.toFixed(2)})
                  </span>
                </li>
              ))}
            </ul>
            <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
          </div>

          <div className="actions">
            <button onClick={handleProceedToPayment} className="btn-proceed">
              Proceed to Payment
            </button>
          </div>
        </>
      )}

      {!loading && !error && cart.length === 0 && <p>Your cart is empty.</p>}
    </div>
  );
};

export default PlaceOrder;
