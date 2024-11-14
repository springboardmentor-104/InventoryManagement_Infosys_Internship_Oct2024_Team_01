import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onFinish = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
              { email, password },
              { headers: { 'Content-Type': 'application/json' } }
          );
          const { token } = response.data;
          localStorage.setItem('token', token);
  
          const decodedToken = jwtDecode(token);
          const userRole = decodedToken.role;
  
          if (userRole === 'admin') {
              window.location.href = '/admin/dashboard';
          } else {
              window.location.href = '/user/dashboard';
          }
      } catch (err) {
          console.log(err.response);
          setError('Invalid credentials. Please try again.');
      }
  };
  

  return (
    <div className="login-page">
      <div className="card-container">
        {/* Left Panel (Login Form) */}
        <div className="login-panel">
          <h2 className="login-title">Login</h2>
          <div className="google-button">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ca85bd4195c3967cf9597af5d7101f3f1cf8777bf80cb8a91b2c6be32dcc5905?placeholderIfAbsent=true&apiKey=6de64210dad5440294bfb16468effd24"
              alt="Google Icon"
              className="google-icon"
            />
            <span>Sign in with Google</span>
          </div>

          <form className="login-form" onSubmit={onFinish}>
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />

            {error && <div className="error-message">{error}</div>}

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <button className="login-button" type="submit">
              Sign In
            </button>
          </form>

          <div className="register-link">
            Not registered yet? <Link to="/signup">Create a new account</Link>
          </div>
        </div>

        {/* Right Panel (Side Image and Text) */}
        <div className="side-panel">
          <div className="side-image-wrapper">
            <img
              src="https://images.pexels.com/photos/6169180/pexels-photo-6169180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Background"
              className="side-image"
            />
            <div className="welcome-text">
              <h3>Welcome Back!</h3>
              <p>Please sign in to your account with the given details to continue</p>
              <div className="new-account-text">
                New here? <Link to="/signup">Create a new account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
