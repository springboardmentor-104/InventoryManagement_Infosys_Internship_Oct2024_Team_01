import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate sending email
    console.log('Password reset link sent to:', email);
    // Redirect to the login page or show a success message
    navigate('/login');
  };

  return (
    <div className="forget-password-container">
      <h2 className="title">Forgot Password</h2>
      <p className="description">Enter your email to receive a password reset link.</p>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          required
          className="email-input"
        />
        <button type="submit" className="submit-button">Send Reset Link</button>
      </form>
      <div className="back-to-login">
        <button onClick={() => navigate('/login')} className="link-button">Back to Login</button>
      </div>
    </div>
    
  );
};

export default ForgotPassword;
