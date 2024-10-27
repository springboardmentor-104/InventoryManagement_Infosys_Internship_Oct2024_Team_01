// OTPVerification.js
import React, { useState, useEffect } from 'react';
import './OTPVerification.css';

function OTPVerification() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Clear the interval when component unmounts or countdown finishes
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate OTP
    if (otp.length !== 6 || !/^[a-zA-Z0-9]+$/.test(otp)) {
      setError('OTP must be a 6-character alphanumeric code.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="otp-verification-container">
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit} className="otp-form">
        <label htmlFor="otp">Enter OTP:</label>
        <input
          id="otp"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          maxLength={6}
          className="otp-input"
        />
        <div className="timer">
          Time Remaining: {formatTime(timeRemaining)}
        </div>
        <button type="submit" className={`otp-button ${loading ? 'loading' : ''}`} disabled={loading || timeRemaining === 0}>
          {loading ? <span className="loading-spinner"></span> : 'Verify OTP'}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}

export default OTPVerification;
