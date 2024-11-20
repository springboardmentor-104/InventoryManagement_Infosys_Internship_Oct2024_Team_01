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
          setCart(response.data.products || []);
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
  const totalMRP = cart.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  const discount = 100; // Example fixed discount value, adjust as per your logic
  const shippingFee = totalMRP >= 1000 ? 0 : 79; // Free shipping above Rs.1000
  const platformFee = 20;
  const totalAmount = totalMRP - discount + shippingFee + platformFee;

  // Handle "Place Order" click
  const handleProceedToPayment = () => {
    navigate('/user/payment');
  };

  return (
    <div className="place-order-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
          {/* Left Section */}
          <div className="order-left">
            <h3>Order Details</h3>
            {cart.map((item) => (
              <div className="product-item" key={item.productId._id}>
                <img
                  src={item.productId.imageUrl || 'default-image.jpg'}
                  alt={item.productId.name}
                />
                <div className="product-info">
                  <h4>{item.productId.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: Rs.{item.productId.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-right">
            <h3>Order Summary</h3>
            <div className="price-summary">
              <div>
                <span>Total MRP</span>
                <span>Rs.{totalMRP.toFixed(2)}</span>
              </div>
              <div>
                <span>Discount</span>
                <span>- Rs.{discount.toFixed(2)}</span>
              </div>
              <div>
                <span>Shipping Fee</span>
                <span>Rs.{shippingFee.toFixed(2)}</span>
              </div>
              <div>
                <span>Platform Fee</span>
                <span>Rs.{platformFee.toFixed(2)}</span>
              </div>
              <hr />
              <div>
                <h4>Total Amount</h4>
                <h4>Rs.{totalAmount.toFixed(2)}</h4>
              </div>
            </div>
            <button className="place-order-btn" onClick={handleProceedToPayment}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;
