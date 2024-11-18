import React, { useState } from 'react';
import './Payment.css';

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // Static order details
  const orderDetails = {
    totalMRP: 2000,
    discount: 500,
    platformFee: 50,
    shippingFee: 100,
    totalAmount: 1650,
  };

  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    alert(`Payment successful using ${selectedPaymentMethod}!`);
  };

  return (
    <div className="payment-page">
      <div className="payment-options">
        <h3>Choose Payment Mode</h3>
        <ul>
          <li
            className={selectedPaymentMethod === 'Cash on Delivery' ? 'selected' : ''}
            onClick={() => handlePaymentSelection('Cash on Delivery')}
          >
            Cash on Delivery (Cash/UPI)
          </li>
          <li
            className={selectedPaymentMethod === 'UPI' ? 'selected' : ''}
            onClick={() => handlePaymentSelection('UPI')}
          >
            UPI (Pay via any App)
          </li>
          <li
            className={selectedPaymentMethod === 'Credit/Debit Card' ? 'selected' : ''}
            onClick={() => handlePaymentSelection('Credit/Debit Card')}
          >
            Credit/Debit Card
          </li>
        </ul>
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <div className="summary-details">
          <p>Total MRP: {orderDetails.totalMRP}</p>
          <p>Discount: -${orderDetails.discount}</p>
          <p>Platform Fee: ${orderDetails.platformFee}</p>
          <p>Shipping Fee: ${orderDetails.shippingFee}</p>
          <h4>Total Amount: ${orderDetails.totalAmount}</h4>
        </div>
        <button onClick={handlePayment}>Pay Now</button>
      </div>
    </div>
  );
};

export default Payment;
