import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';
import dashboardImage from '../assests/dashboard.png'

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
    <div className="Signup-container">
    <div className="login-container">
      <div className="login-right">
       
        <img src={dashboardImage} alt="Dashboard" className="dashboard-image" />
      </div>
      <div className="login-left">
        <h2>Log in to your Account</h2>
        <p className="welcome">Welcome back!</p>
        
       
        <form onSubmit={onFinish}>
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
          {error && <p className='text-red-500 font-semibold mt-2 text-xl'>{error}</p>}
          <button type="submit" className="login-btn">Log In</button>
        </form>
        <p className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a> 
        </p>
        <p className="footer-text">
          Don't have an account? <Link to="/signup">Create an account</Link> 
        </p>
      </div>
    </div>
    </div>
  );

};

export default Login;
