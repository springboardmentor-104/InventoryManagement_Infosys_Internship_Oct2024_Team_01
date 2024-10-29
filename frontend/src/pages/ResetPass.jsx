import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPass.css';

const ResetPass = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the password reset
    if (password === confirmPassword) {
      console.log('Password reset successful:', password);
      // Redirect to login or show success message
      navigate('/login');
    } else {
      console.log('Passwords do not match.');
      alert("Passwords do not match.");
    }
  };

  return (
    <div className="reset-password-container">
      <h2 className="title">Reset Password</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          required
          className="password-input"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="password-input"
        />
        <button type="submit" className="submit-button">Reset Password</button>
      </form>
      <div className="back-to-login">
        <button onClick={() => navigate('/login')} className="link-button">Back to Login</button>
      </div>
    </div>
  );
};

export default ResetPass;
