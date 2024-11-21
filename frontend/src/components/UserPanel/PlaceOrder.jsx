import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getImageUrl } from '../../utils/imageUtil';
import { loadRazorpayScript } from '../../utils/razorpayUtil';
import { getUserDetails } from '../../utils/authUtil';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userDetails = getUserDetails();

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
  const discount = 100;
  const shippingFee = totalMRP >= 1000 ? 0 : 79; // Free shipping above Rs.1000
  const platformFee = 20;
  const totalAmount = totalMRP - discount + shippingFee + platformFee;

  // Create order
  const createOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token is missing. Please log in.');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/create-order`,
        { amount: totalAmount * 100 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data; // Expected to return { orderId, amount, currency }
      } else {
        throw new Error('Failed to create Razorpay order');
      }
    } catch (err) {
      console.error('Error creating order:', err.message);
      throw err;
    }
  };

  // Handle "Place Order"
  const handlePlaceOrder = async () => {
    try {
      const isScriptLoaded = await loadRazorpayScript();
  
      if (!isScriptLoaded) {
        alert('Failed to load Razorpay SDK. Please check your connection.');
        return;
      }
  
      const orderDetails = await createOrder();
      console.log(orderDetails);
      console.log(userDetails);
  
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: 'SmartStock',
        description: 'Order Payment',
        order_id: orderDetails.orderId,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/api/payment/verify-payment`,
              response,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
              }
            );
  
            if (verifyResponse.data.success) {
              alert('Payment successful! Order placed.');
              navigate('/user/order-confirmation'); // Redirect to confirmation page
            } else {
              alert('Payment verification failed. Please try again.');
            }
          } catch (err) {
            console.error('Error verifying payment:', err.message);
            alert('Payment verification failed. Please try again.');
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.contact,
        },
        theme: {
          color: '#3399cc',
        },
      };
  
      // Initialize Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
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
                  src={
                    item.productId.images && item.productId.images.length > 0
                      ? getImageUrl(item.productId.images[0])
                      : 'default-image.jpg'
                  }
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
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlaceOrder;
