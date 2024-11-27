import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

import Signup_img from '../assests/Signup_img.png';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/register`,
        { name, email, password, role: 'user' },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        setMessage(response.data.message || 'User registered successfully.');
        setMessageType('success');
        setTimeout(() => {
          navigate('/verify-email');
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'An error occurred.');
        setMessageType('error');
      } else {
        setMessage('Something went wrong. Please try again.');
        setMessageType('error');
      }
    }

    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);
  };

  return (
    <div className="Signup-container">
      <div className="login-container">
        <div className="login-right">
          <img src={Signup_img} alt="Signup Illustration" className="dashboard-image" />
        </div>
        <div className="login-left">
          <h2>Create an Account</h2>
          <p className="welcome">Welcome! Please fill in the details to sign up:</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="input-field"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="terms">
              <input
                type="checkbox"
                required
                checked={termsAgreed}
                onChange={() => setTermsAgreed(!termsAgreed)}
              />
              <span>
                I agree to all <a href="https://example.com/terms">terms & privacy policies</a>
              </span>
            </div>
            <button type="submit" className="login-btn">Sign Up</button>
          </form>

          <p className="footer-text">
            Already have an account?{' '}
            <Link to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Display message */}
      {message && (
        <div className={`message ${messageType} show`}>
          {message}
          <button className="close-btn" onClick={() => setMessage(null)}>
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUp;
