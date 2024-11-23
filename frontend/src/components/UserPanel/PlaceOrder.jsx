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
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const userDetails = getUserDetails();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setAlert({ type: 'error', message: 'Please log in to view your cart' });
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
        setAlert({ type: 'error', message: err.response?.data?.message || err.message });
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const totalMRP = cart.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  const discount = 100;
  const shippingFee = totalMRP >= 1000 ? 0 : 79;
  const platformFee = 20;
  const totalAmount = totalMRP - discount + shippingFee + platformFee;

  const createOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token is missing. Please log in.');
      }

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/create-order`,
        { amount: totalAmount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to create Razorpay order');
      }
    } catch (err) {
      setAlert({ type: 'error', message: `Error: ${err.message}` });
      throw err;
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        setAlert({ type: 'error', message: 'Failed to load Razorpay SDK. Please check your connection.' });
        return;
      }

      const { order: orderDetails } = await createOrder();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        order_id: orderDetails.id,
        name: 'SmartStock',
        description: 'Order Payment',
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
              // Create the order in the database after payment verification
              const orderData = {
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                items: cart.map((item) => ({
                  product: item.productId._id,
                  quantity: item.quantity,
                  price: item.productId.price,
                })),
                totalPrice: totalAmount,
              };

              const createOrderResponse = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/orders/place-order`,
                orderData,
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                  },
                }
              );

              if (createOrderResponse.status === 201) {
                setAlert({ type: 'success', message: 'Payment successful! Order placed.' });
                setTimeout(() => navigate('/user/order-confirmation'), 1000);
              } else {
                setAlert({ type: 'error', message: 'Failed to create order in database.' });
              }
            } else {
              setAlert({ type: 'error', message: 'Payment verification failed. Please try again.' });
            }
          } catch (err) {
            setAlert({ type: 'error', message: `Error verifying payment: ${err.message}` });
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.contact,
        },
        theme: { color: '#3399cc' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setAlert({ type: 'error', message: `Error: ${err.message}` });
    }
  };

  return (
    <div className="place-order-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {alert && <p className={`alert-message ${alert.type}`}>{alert.message}</p>}
          <div className="order-left">
            {/* Cart items */}
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
            {/* Order Summary */}
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
