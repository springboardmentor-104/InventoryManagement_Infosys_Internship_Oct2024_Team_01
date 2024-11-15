import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Logout.css'; // Import the stylesheet

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure session is cleared
      });

      if (!response.ok) {
        throw new Error('Failed to log out');
      } 
      localStorage.removeItem('authToken'); 

      // Navigate to login page
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      // Optionally, display an error message to the user
    }
  };

  React.useEffect(() => {
    handleLogout(); // Call the logout function when this page is loaded
  }, []);

  return (
    <div className="logout-container">
    <div className="logout-card">
      <h2 className="logout-title">You have been logged out.</h2>
      <button 
        className="logout-button" 
        onClick={() => navigate('/login')}
      >
        Login Again
      </button>
    </div>
  </div>
  );
};

export default Logout;
