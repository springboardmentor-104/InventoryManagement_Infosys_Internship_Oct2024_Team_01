import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Logout.css';

const Logout = () => {
    const navigate = useNavigate();
  
    const handleLogout = async () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
          console.warn("No token found in localStorage");
          navigate("/login");
          return;
        }
    
        try {
          await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/users/logout`,
            { token },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          localStorage.removeItem("token");
          navigate("/login");
        } catch (error) {
          console.error("Logout error:", error);
        }
    };

    return (
        <div className="logout-container">
          <div className="logout-card">
            <h2 className="logout-title">Are you sure you want to log out?</h2>
            <button className="logout-button" onClick={handleLogout}>
              Confirm Logout
            </button>
          </div>
        </div>
      );
    };
  
  export default Logout;