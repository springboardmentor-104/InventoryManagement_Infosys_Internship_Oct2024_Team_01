import React from "react";
import { useNavigate } from 'react-router-dom';
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  
  return (
    <div className="order-confirmation-container">
      <div className="order-card">
        <h2>Order Placed!</h2>
        <p>Your order was successfully placed and is being prepared for delivery.</p>
        <div className="order-image">
          <img
            src="https://img.freepik.com/premium-vector/online-fast-delivery-services-buy-ecommerce-express-delivery-mobile-concept-by-phone_107661-498.jpg?w=740" // Placeholder image
            alt="Order Illustration"
          />
        </div>
        <button className="back-to-store" onClick={() => navigate('/user/cart')}>BACK TO STORE</button>
        <button className="view-order-details" onClick={() => navigate('/user/my-orders')}>View Order Details</button>
      </div>
      
    </div>
  );
};

export default OrderConfirmation;
