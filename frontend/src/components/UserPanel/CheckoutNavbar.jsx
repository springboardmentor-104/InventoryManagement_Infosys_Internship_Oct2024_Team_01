import React from 'react';
import { useLocation } from 'react-router-dom';
import './CheckoutNavbar.css';

const CheckoutNavbar = () => {
  const location = useLocation();

  const steps = [
    { path: '/user/billing-details', label: 'ADDRESS' },
    { path: '/user/place-order', label: 'ORDER SUMMARY' },
    { path: '/user/payment', label: 'PAYMENT' },
  ];

  const getStepClass = (path) => {
    const currentIndex = steps.findIndex(step => step.path === location.pathname);
    const stepIndex = steps.findIndex(step => step.path === path);

    if (currentIndex === stepIndex) return 'active';
    if (currentIndex > stepIndex) return 'completed';
    return '';
  };

  return (
    <nav className="checkout-navbar">
      <div className="checkout-container">
        {/* Branding */}
        <div className="brand">
          <span className="brand-text"> </span>
        </div>

        {/* Steps */}
        <ul className="steps">
          {steps.map((step, index) => (
            <li key={index} className={`step ${getStepClass(step.path)}`}>
              {step.label}
            </li>
          ))}
        </ul>

        {/* Secure Badge */}
        <div className="secure-badge">
          <span>✔ 100% SECURE</span>
        </div>
      </div>
    </nav>
  );
};

export default CheckoutNavbar;
